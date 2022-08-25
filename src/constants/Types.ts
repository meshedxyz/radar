import { RPCSignatureRequestInput, SignatureRequestReport } from "./API";

export interface TabProviderInfo {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  chainId: string;
}

export interface EthSendTransactionRequestParam {
  from: string;
  to: string;
  data: string;
  gas: string;
  gasPrice: string;
  value: string;
  nonce: string;
}

export interface JsonRpcRequest {
  method: string;
  params?: unknown[] | object;
  id: string | undefined;
  jsonrpc: "2.0";
}

export interface JsonRpcResponse {
  id?: string;
  jsonrpc?: string;
  method?: string;
  result?: unknown;
  error?: { code: number; message: string };
}

export interface SignatureRequestInfo {
  providerInfo: TabProviderInfo;
  method: string;
  params: Array<unknown>;
  id: string | undefined;
}

export type JsonRpcCallback = (
  error: Error,
  response: JsonRpcResponse
) => unknown;

export enum FetchState {
  Loading,
  Loaded,
  Failed,
}

export interface HistoricalSignatureRequestReport {
  date: number;
  report: SignatureRequestReport;
  key: string;
  req: RPCSignatureRequestInput;
}

export interface SignatureRequestReportHandler {
  (report: SignatureRequestReport): void;
}

export enum WindowRef {
  root = "root",
  body = "body",
}

export const RADAR_EVENT = "radar-event";
export const SUBMIT_REPORT_REQUEST = "submit-report";
export const GET_SIGNATURE_REQUEST_REPORT = "get-signature-request-report";
export const NEW_SIG_REQ_REPORT = "new-signature-request-report";
export const GET_TRUST_LIST = "get-trust-list";
export const UPDATE_TRUST_LIST = "update-trust-list";
export const REMOVE_FROM_TRUST_LIST = "remove-from-trust-list";
export const GET_REPORT_HISTORY = "get-report-history";
export const REMOVE_FROM_HISTORY = "remove-from-history";
export const GET_FTUE_COMPLETED = "is-first-time-user-experience-completed";
export const SET_FTUE_COMPLETED = "set-first-time-user-completed";

export const FTUE_STORAGE_KEY = "radar-first-time-user-completed";
export const REVOKE = "Revoke";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const POPUP_FAILURE_TIMEOUT = 15000;

export const UINT256_MAX =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const ALL_AMOUNT = "All";
export const ADDRESS_CHARACTER_LENGTH = 42;
export const POPUP_WIDTH = 382;
export const POPUP_HEIGHT = 310;
export const METAMASK_WALLET_WIDTH = 382;
export const REPORT_HISTORY_PAGE_SIZE = 20;

export const REPORT_ID_SEARCH_PARAM = "reportId";

export const PROXIED_FUNCTIONS = new Set(["request", "sendAsync", "send"]);
export const RADAR_METHODS = new Set([
  "eth_sendTransaction",
  "eth_signTransaction",
  "eth_signTypedData",
  "eth_signTypedData_v1",
  "eth_signTypedData_v2",
  "eth_signTypedData_v3",
  "eth_signTypedData_v4",
  "personal_sign",
  "eth_sign",
]);

export const NATIVE_ASSETS: { [key: string]: string } = {
  "1": "ETH",
  "10": "ETH",
  "137": "MATIC",
  "250": "FTM",
  "42161": "ETH",
  "43114": "AVAX",
};

export const CHAIN_ID_TO_BLOCKSCAN_ENDPOINTS: { [key: string]: string } = {
  "1": "https://etherscan.io",
  "10": "https://optimistic.etherscan.io",
  "137": "https://polygonscan.com",
  "250": "https://ftmscan.com",
  "42161": "https://arbiscan.io",
  "43114": "https://snowtrace.io",
};
