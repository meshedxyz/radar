import { Runtime } from "webextension-polyfill";
import { browser, Tabs } from "webextension-polyfill-ts";
import {
  METAMASK_WALLET_WIDTH,
  NEW_SIG_REQ_REPORT,
  POPUP_HEIGHT,
  POPUP_WIDTH,
  REPORT_ID_SEARCH_PARAM,
} from "../../../constants/Types";

export default class WindowService {
  private windowCreationLock = Promise.resolve();
  private unlock: { (): void } = () => {}; // no-op till set

  private createPopup = async (senderWindowId: number, reportId: string) => {
    return browser.windows
      .get(senderWindowId)
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
      .then(async (position) => {
        return browser.windows.create({
          url: `popup.html?${REPORT_ID_SEARCH_PARAM}=${encodeURIComponent(
            reportId
          )}`,
          type: "popup",
          width: POPUP_WIDTH,
          height: POPUP_HEIGHT,
          left: position.left,
          top: position.top,
          focused: false,
        });
      });
  };

  private getPopup = async () => {
    const popupUrl = `chrome-extension://${browser.runtime.id}/popup.html*`;
    return browser.tabs
      .query({ url: popupUrl, windowType: "popup" })
      .catch(() => {
        return [] as Tabs.Tab[];
      });
  };

  public getReportWindow = async (
    sender: Runtime.MessageSender,
    reportId: string
  ) => {
    await this.windowCreationInProgress();
    this.setWindowCreationInProgress();
    return this.getPopup()
      .then(async (tabs) => {
        if (tabs?.length) {
          const w = await browser.windows
            .get(tabs[0].windowId!, { populate: true })
            .catch(() => undefined);
          if (w) {
            browser.tabs.sendMessage(tabs[0].id!, {
              type: NEW_SIG_REQ_REPORT,
              data: { id: reportId },
            });

            return w;
          }
        }

        console.log(`Creating new radar window.`);
        return this.createPopup(sender!.tab!.windowId!, reportId);
      })
      .then((w) => {
        setTimeout(
          () => browser.windows.update(w.id!, { focused: true }).catch(),
          200
        );
        return w;
      });
  };

  private setWindowCreationInProgress() {
    this.windowCreationLock = new Promise((resolve) => {
      this.unlock = resolve;
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  public setWindowCreationCompleted() {
    try {
      this.unlock();
    } catch (e) {}
  }

  private async windowCreationInProgress() {
    await this.windowCreationLock;
  }
}
