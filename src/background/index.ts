import { browser } from "webextension-polyfill-ts";
import ReportService from "./modules/service/ReportService";
import StorageService from "./modules/service/StorageService";
import MeshedAPI from "./modules/service/MeshedAPI";
import WindowService from "./modules/service/WindowService";
import { RPCSignatureRequest, TrustListStatus } from "../constants/API";
import {
  FTUE_STORAGE_KEY,
  GET_FTUE_COMPLETED,
  SET_FTUE_COMPLETED,
  GET_TRUST_LIST,
  RADAR_EVENT,
  REMOVE_FROM_TRUST_LIST,
  SignatureRequestInfo,
  GET_SIGNATURE_REQUEST_REPORT,
  SUBMIT_REPORT_REQUEST,
  UPDATE_TRUST_LIST,
  GET_REPORT_HISTORY,
  REMOVE_FROM_HISTORY,
} from "../constants/Types";

const storage = await new StorageService().init();
const meshedApi = new MeshedAPI();
const reportService = new ReportService(meshedApi, storage);
const windowService = new WindowService();

browser.runtime.onMessage.addListener(async function (message, sender) {
  try {
    if (message.type == RADAR_EVENT) {
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
        .then(async (trustStatus) => {
          if (trustStatus === TrustListStatus.NoPopup) {
            return Promise.resolve();
          }
          const reportId = reportService.addRequest(signatureRequest);
          await windowService.getReportWindow(sender, reportId);
          return reportId;
        });
    } else if (message.type === GET_SIGNATURE_REQUEST_REPORT) {
      windowService.setWindowCreationCompleted();
      return reportService.getReport(message.data.id);
    } else if (message.type === GET_REPORT_HISTORY) {
      return reportService.getHistoricalReports(message.data.start || 0);
    } else if (message.type === REMOVE_FROM_HISTORY) {
      return storage.removeReport(message.data.key);
    } else if (message.type === SUBMIT_REPORT_REQUEST) {
      return meshedApi.submitFraudReport(
        message.data.report,
        message.data.message
      );
    } else if (message.type === GET_TRUST_LIST) {
      return storage.getTrustList();
    } else if (message.type === UPDATE_TRUST_LIST) {
      return storage.updateTrustList(message.data.domain, message.data.state);
    } else if (message.type === REMOVE_FROM_TRUST_LIST) {
      return storage.removeFromTrustList(message.data.domain);
    } else if (message.type === GET_FTUE_COMPLETED) {
      return storage.getSetting(FTUE_STORAGE_KEY).then((v) => {
        return !!v;
      });
    } else if (message.type === SET_FTUE_COMPLETED) {
      return storage.setSetting(FTUE_STORAGE_KEY, true);
    }
    return Promise.resolve();
  } catch (e) {
    console.error("Error during processing: " + JSON.stringify(e));
  }
});
