import { browser } from "webextension-polyfill-ts";
import ReportService from "./modules/service/ReportService";
import StorageService from "./modules/service/StorageService";
import MeshedAPI from "./modules/service/MeshedAPI";
import {
  RPCSignatureRequest,
  RiskScore,
  TrustListStatus,
} from "../constants/API";
import {
  FTUE_STORAGE_KEY,
  GET_IS_FTU,
  GET_SIG_REQ_REPORT,
  GET_TRUST_LIST,
  METAMASK_WALLET_WIDTH,
  POPUP_HEIGHT,
  POPUP_WIDTH,
  RADAR_EVENT,
  REMOVE_FROM_TRUST_LIST,
  SET_IS_FTU,
  SignatureRequestInfo,
  SUBMIT_REPORT_REQUEST,
  UPDATE_TRUST_LIST,
} from "../constants/Types";

const meshedApi = new MeshedAPI();
const reportService = new ReportService(meshedApi);
const storage = await new StorageService().init();

browser.runtime.onMessage.addListener(async function (message, sender) {
  try {
    if (message.type == GET_SIG_REQ_REPORT) {
      return reportService
        .getReport(sender!.tab!.id!)
        .catch((error: any) => {
          console.error("Error fetching data for signature request. " + error);
          return null;
        })
        .then(async (report) => {
          return storage
            .getTrustListStatus(report?.requesterContext.domain!)
            .then((val) => {
              if (val === TrustListStatus.Trusted) {
                report!.riskSummary!.score = RiskScore.Trusted;
              }
              return report;
            });
        });
    } else if (message.type == RADAR_EVENT) {
      const reqInfo = message.data as SignatureRequestInfo;
      const signatureRequest: RPCSignatureRequest = {
        method: reqInfo.method,
        params: reqInfo.params,
        requester: meshedApi.getDomainFromURL(sender!.tab!.url!),
        chainId: reqInfo.providerInfo.chainId,
      };

      if (
        !signatureRequest.method ||
        !signatureRequest.requester ||
        !signatureRequest.params
      ) {
        return Promise.resolve(); // empty request - take no action
      }

      return storage
        .getTrustListStatus(signatureRequest.requester)
        .then((trustStatus) => {
          if (trustStatus === TrustListStatus.NoPopup) {
            return;
          }
          browser.windows
            .get(sender!.tab!.windowId!)
            .then((senderWindow) => {
              return {
                left:
                  senderWindow.left! +
                  senderWindow.width! -
                  (POPUP_WIDTH + METAMASK_WALLET_WIDTH),
                top: senderWindow.top,
              };
            })
            .catch(() => {
              return { left: 0, top: 0 };
            })
            .then((position) => {
              return browser.windows.create({
                url: "popup.html",
                type: "popup",
                width: POPUP_WIDTH,
                height: POPUP_HEIGHT,
                left: position.left,
                top: position.top,
                focused: false,
              });
            })
            .then((popup) => {
              reportService.addRequest(popup.tabs![0].id!, signatureRequest);
              setTimeout(
                () => browser.windows.update(popup.id!, { focused: true }),
                200
              );
            });
        });
    } else if (message.type === SUBMIT_REPORT_REQUEST) {
      return reportService.getReport(sender!.tab!.id!).then((r) => {
        meshedApi.submitFraudReport(r, message.data.message);
      });
    } else if (message.type === GET_TRUST_LIST) {
      return storage.getTrustList();
    } else if (message.type === UPDATE_TRUST_LIST) {
      return storage.updateTrustList(message.data.domain, message.data.state);
    } else if (message.type === REMOVE_FROM_TRUST_LIST) {
      return storage.removeFromTrustList(message.data.domain);
    } else if (message.type === GET_IS_FTU) {
      return storage.getSetting(FTUE_STORAGE_KEY);
    } else if (message.type === SET_IS_FTU) {
      return storage.setSetting(FTUE_STORAGE_KEY, false);
    }
    return Promise.resolve();
  } catch (e) {
    console.error("Error during processing: " + JSON.stringify(e));
  }
});
