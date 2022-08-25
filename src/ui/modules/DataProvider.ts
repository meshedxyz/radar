import {
  SignatureRequestReport,
  TrustList,
  TrustListStatus,
} from "../../constants/API";
import { browser } from "webextension-polyfill-ts";
import {
  GET_FTUE_COMPLETED,
  GET_TRUST_LIST,
  REMOVE_FROM_TRUST_LIST,
  SET_FTUE_COMPLETED,
  SignatureRequestReportHandler,
  NEW_SIG_REQ_REPORT,
  SUBMIT_REPORT_REQUEST,
  UPDATE_TRUST_LIST,
  HistoricalSignatureRequestReport,
  REMOVE_FROM_HISTORY,
  GET_REPORT_HISTORY,
  GET_SIGNATURE_REQUEST_REPORT,
  REPORT_ID_SEARCH_PARAM,
} from "../../constants/Types";
import { Runtime } from "webextension-polyfill";

export const timeout = () =>
  new Promise(function (_, reject) {
    setTimeout(function () {
      reject("Request timed out!");
    }, 15000);
  });

async function submitReport(
  message: String,
  report?: SignatureRequestReport
): Promise<void> {
  return browser.runtime.sendMessage({
    type: SUBMIT_REPORT_REQUEST,
    data: { message: message, report: report },
  });
}

function getTrustList(): Promise<TrustList> {
  return browser.runtime.sendMessage({ type: GET_TRUST_LIST });
}

function updateTrustList(
  domain: String,
  state: TrustListStatus
): Promise<void> {
  return browser.runtime.sendMessage({
    type: UPDATE_TRUST_LIST,
    data: { domain: domain, state: state },
  });
}

function removeFromTrustList(domain: String): Promise<void> {
  return browser.runtime.sendMessage({
    type: REMOVE_FROM_TRUST_LIST,
    data: { domain: domain },
  });
}

function getReportHistory(
  start: number
): Promise<HistoricalSignatureRequestReport[]> {
  return browser.runtime.sendMessage({
    type: GET_REPORT_HISTORY,
    data: { start },
  });
}

function removeReportHistory(key: string): Promise<void> {
  return browser.runtime.sendMessage({
    type: REMOVE_FROM_HISTORY,
    data: { key },
  });
}

async function isFirstTimeUser(): Promise<boolean> {
  return browser.runtime
    .sendMessage({ type: GET_FTUE_COMPLETED })
    .then((response) => {
      return !response;
    })
    .catch(() => {
      return false;
    });
}

function setFirstTimeUserExperienceCompleted(): Promise<boolean> {
  return browser.runtime.sendMessage({ type: SET_FTUE_COMPLETED });
}

interface ReportListener {
  callback: { (r: SignatureRequestReport): void };
  failure: { (): void };
}

const reportListeners: ReportListener[] = [];

function addReportListener(
  callback: SignatureRequestReportHandler,
  failure: { (): void }
) {
  reportListeners.push({ callback, failure });
}

async function getReport(id: string) {
  return Promise.race([
    timeout(),
    browser.runtime.sendMessage({
      type: GET_SIGNATURE_REQUEST_REPORT,
      data: { id },
    }),
  ]).then(
    (r) => {
      reportListeners.forEach((l) => {
        l.callback(r);
      });
    },
    () => {
      reportListeners.forEach((l) => {
        l.failure();
      });
    }
  );
}

async function getInitialReport(): Promise<void> {
  const initialReportId = new URLSearchParams(window.location.search).get(
    REPORT_ID_SEARCH_PARAM
  );
  return getReport(initialReportId!);
}

browser.runtime.onMessage.addListener(
  (message: any, sender: Runtime.MessageSender) => {
    if (
      message.type === NEW_SIG_REQ_REPORT &&
      browser.runtime.id === sender.id &&
      message.data
    ) {
      return getReport(message.data.id);
    }
  }
);

export {
  submitReport,
  updateTrustList,
  getTrustList,
  removeFromTrustList,
  isFirstTimeUser,
  setFirstTimeUserExperienceCompleted,
  addReportListener,
  getInitialReport,
  getReportHistory,
  removeReportHistory,
};
