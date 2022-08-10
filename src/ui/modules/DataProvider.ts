import {
  SignatureRequestReport,
  TrustList,
  TrustListStatus,
} from "../../constants/API";
import { browser } from "webextension-polyfill-ts";

const timeout = new Promise(function (reject) {
  setTimeout(function () {
    reject("Request timed out!");
  }, 15000);
});

function getSigReqReport(): Promise<SignatureRequestReport> {
  return Promise.race([
    timeout,
    browser.runtime.sendMessage({ type: "get-signature-request-report" }),
  ]);
}

function submitReport(message: String): Promise<void> {
  return browser.runtime.sendMessage({
    type: "submit-report",
    data: { message: message },
  });
}

function getTrustList(): Promise<TrustList> {
  return browser.runtime.sendMessage({ type: "get-trust-list" });
}

function updateTrustList(
  domain: String,
  state: TrustListStatus
): Promise<void> {
  return browser.runtime.sendMessage({
    type: "update-trust-list",
    data: { domain: domain, state: state },
  });
}

function removeFromTrustList(domain: String): Promise<void> {
  return browser.runtime.sendMessage({
    type: "remove-from-trust-list",
    data: { domain: domain },
  });
}

function isFirstTimeUser(): Promise<boolean> {
  return browser.runtime
    .sendMessage({ type: "get-is-first-time-user" })
    .then((response) => {
      return !!response;
    })
    .catch(() => {
      return true;
    });
}

function setIsFirstTimeUser(): Promise<boolean> {
  return browser.runtime.sendMessage({ type: "set-is-first-time-user" });
}

export {
  getSigReqReport,
  submitReport,
  updateTrustList,
  getTrustList,
  removeFromTrustList,
  isFirstTimeUser,
  setIsFirstTimeUser,
};
