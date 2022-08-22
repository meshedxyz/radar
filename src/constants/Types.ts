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

export const RADAR_EVENT = "radar-event";
export const SUBMIT_REPORT_REQUEST = "submit-report";
export const GET_SIG_REQ_REPORT = "get-signature-request-report";
export const GET_TRUST_LIST = "get-trust-list";
export const UPDATE_TRUST_LIST = "update-trust-list";
export const REMOVE_FROM_TRUST_LIST = "remove-from-trust-list";
export const GET_IS_FTU = "get-is-first-time-user";
export const SET_IS_FTU = "set-is-first-time-user";
export const ETHEREUM_REQUEST = "linked-ethereum-rpc-request";
export const ETHEREUM_EVENT = "linked-ethereum-event";
export const FTUE_STORAGE_KEY = "radar-first-time-user";
export const REVOKE = "Revoke";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const UINT256_MAX =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const ALL_AMOUNT = "All";
export const ADDRESS_CHARACTER_LENGTH = 42;
export const POPUP_WIDTH = 382;
export const POPUP_HEIGHT = 310;
export const METAMASK_WALLET_WIDTH = 382;

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

interface NaitiveAssets {
  [key: string]: string;
}
export const nativeAssets: NaitiveAssets = {
  "1": "ETH",
  "10": "ETH",
  "137": "MATIC",
  "250": "FTM",
  "42161": "ETH",
  "43114": "AVAX",
};

interface ChainToScans {
  [key: string]: string;
}
export const CHAIN_ID_TO_BLOCKSCAN_ENDPOINTS: ChainToScans = {
  "1": "https://etherscan.io",
  "10": "https://optimistic.etherscan.io",
  "137": "https://polygonscan.com",
  "250": "https://ftmscan.com",
  "42161": "https://arbiscan.io",
  "43114": "https://snowtrace.io"
}