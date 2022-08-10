/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFraudReportInput = {
  message?: string | null;
  report?: SignatureRequestReportInput | null;
  id?: string | null;
};

export type SignatureRequestReportInput = {
  riskSummary: RiskSummaryInput;
  requesterContext: RequesterContextInput;
  addressContexts?: string | null;
  actionContext: ActionContextInput;
};

export type RiskSummaryInput = {
  score?: RiskScore | null;
  findings?: Array<RiskFindingInput | null> | null;
};

export enum RiskScore {
  Unknown = "Unknown",
  Low = "Low",
  High = "High",
  Trusted = "Trusted",
  None = "None",
  Scam = "Scam",
}

export type RiskFindingInput = {
  type?: RiskFindingType | null;
  message?: string | null;
};

export enum RiskFindingType {
  Positive = "Positive",
  Negative = "Negative",
  Neutral = "Neutral",
}

export type RequesterContextInput = {
  domain?: string | null;
  safeList?: boolean | null;
  fraudStatus?: FraudStatus | null;
  findings?: Array<RiskFindingInput | null> | null;
  method?: string | null;
};

export enum FraudStatus {
  None = "None",
  Investigating = "Investigating",
  OwnerReported = "OwnerReported",
  ActiveFraud = "ActiveFraud",
}

export type ActionContextInput = {
  functionName?: string | null;
  type?: ActionType | null;
  from?: string | null;
  to?: string | null;
  chainId?: string | null;
  data?: string | null;
  findings?: Array<RiskFindingInput | null> | null;
  modifiedAssets?: Array<AssetModificationInput | null> | null;
};

export enum ActionType {
  Approve = "Approve",
  ApproveAll = "ApproveAll",
  Burn = "Burn",
  Buy = "Buy",
  Mint = "Mint",
  Multicall = "Multicall",
  ProxyUpdate = "ProxyUpdate",
  Receive = "Receive",
  RenounceOwnership = "RenounceOwnership",
  Sell = "Sell",
  SetRoyalty = "SetRoyalty",
  SignMessage = "SignMessage",
  Swap = "Swap",
  Transfer = "Transfer",
  TransferEth = "TransferEth",
  TransferOwnership = "TransferOwnership",
  Vote = "Vote",
  Unknown = "Unknown",
  Unapprove = "Unapprove",
}

export type AssetModificationInput = {
  type?: ActionType | null;
  asset?: AssetInput | null;
  destination?: string | null;
};

export type AssetInput = {
  type: AssetType;
  contract?: string | null;
  tokenId?: string | null;
  amount?: string | null;
};

export enum AssetType {
  Ether = "Ether",
  Token = "Token",
}

export type ModelFraudReportConditionInput = {
  message?: ModelStringInput | null;
  and?: Array<ModelFraudReportConditionInput | null> | null;
  or?: Array<ModelFraudReportConditionInput | null> | null;
  not?: ModelFraudReportConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type FraudReport = {
  __typename: "FraudReport";
  message?: string | null;
  report?: SignatureRequestReport | null;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type SignatureRequestReport = {
  __typename: "SignatureRequestReport";
  riskSummary: RiskSummary;
  requesterContext: RequesterContext;
  addressContexts?: { [key: string]: AddressContext };
  actionContext: ActionContext;
  error?: string;
};

export type RiskSummary = {
  __typename: "RiskSummary";
  score?: RiskScore | null;
  findings?: Array<RiskFinding> | null;
};

export type RiskFinding = {
  __typename: "RiskFinding";
  type: RiskFindingType;
  message: string;
};

export type RequesterContext = {
  __typename: "RequesterContext";
  domain: string;
  safeList: boolean;
  fraudStatus?: FraudStatus;
  findings?: Array<RiskFinding>;
  method: string;
};

export type AddressContext = {
  __typename: "AddressContext";
  name?: string | null;
  address?: string | null;
  type?: AddressType | null;
  isAudited?: boolean | null;
  isVerified?: boolean | null;
  safeList?: boolean | null;
  fraudStatus?: FraudStatus;
  findings?: Array<RiskFinding>;
  url?: string | null;
  imageUrl?: string | null;
  twitter?: string | null;
  price?: string | null;
  createdAt?: string | null;
  decimals?: number | null;
};

export type ActionContext = {
  __typename: "ActionContext";
  functionName?: string;
  type?: ActionType;
  from?: string;
  to?: string;
  chainId?: string;
  data?: string;
  findings?: Array<RiskFinding>;
  modifiedAssets?: Array<AssetModification>;
};

export type AssetModification = {
  __typename: "AssetModification";
  type?: ActionType;
  asset?: Asset;
  destination?: string;
};

export type Asset = {
  __typename: "Asset";
  type: AssetType;
  contract?: string | null;
  tokenId?: string | null;
  amount?: string | null;
};

export type CreateAddressEntityInput = {
  address: string;
  chainId: string;
  fraudStatus?: FraudStatus | null;
  safeList?: SafeListStatus | null;
  name?: string | null;
  type?: AddressType | null;
  isAudited?: boolean | null;
  isVerified?: boolean | null;
  url?: string | null;
  imageUrl?: string | null;
  twitter?: string | null;
  createdAt?: string | null;
  decimals?: number | null;
  abi?: string | null;
};

export enum SafeListStatus {
  None = "None",
  Revoked = "Revoked",
  InReview = "InReview",
  Certified = "Certified",
}

export type TrustList = {
  [domain: string]: TrustListStatus;
};

export enum TrustListStatus {
  NoPopup,
  Trusted,
}

export enum AddressType {
  UNKNOWN = "UNKNOWN",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC777 = "ERC777",
  ERC1155 = "ERC1155",
  Exchange = "Exchange",
  SmartContractWallet = "SmartContractWallet",
  EOA = "EOA",
}

export type ModelAddressEntityConditionInput = {
  fraudStatus?: ModelFraudStatusInput | null;
  safeList?: ModelSafeListStatusInput | null;
  name?: ModelStringInput | null;
  type?: ModelAddressTypeInput | null;
  isAudited?: ModelBooleanInput | null;
  isVerified?: ModelBooleanInput | null;
  url?: ModelStringInput | null;
  imageUrl?: ModelStringInput | null;
  twitter?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  decimals?: ModelIntInput | null;
  abi?: ModelStringInput | null;
  and?: Array<ModelAddressEntityConditionInput | null> | null;
  or?: Array<ModelAddressEntityConditionInput | null> | null;
  not?: ModelAddressEntityConditionInput | null;
};

export type ModelFraudStatusInput = {
  eq?: FraudStatus | null;
  ne?: FraudStatus | null;
};

export type ModelSafeListStatusInput = {
  eq?: SafeListStatus | null;
  ne?: SafeListStatus | null;
};

export type ModelAddressTypeInput = {
  eq?: AddressType | null;
  ne?: AddressType | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type AddressEntity = {
  __typename: "AddressEntity";
  address: string;
  chainId: string;
  fraudStatus?: FraudStatus | null;
  safeList?: SafeListStatus | null;
  name?: string | null;
  type?: AddressType | null;
  isAudited?: boolean | null;
  isVerified?: boolean | null;
  url?: string | null;
  imageUrl?: string | null;
  twitter?: string | null;
  createdAt?: string | null;
  decimals?: number | null;
  abi?: string | null;
};

export type RPCSignatureRequestInput = {
  method: string;
  requester: string;
  params: string;
  chainId?: string;
};

export type RPCSignatureRequest = {
  method: string;
  requester: string;
  params: any;
  chainId?: string;
};

export type DomainEntity = {
  __typename: "DomainEntity";
  domain: string;
  fraudStatus?: FraudStatus | null;
  safeList?: SafeListStatus | null;
};

export type CreateFraudReportMutationVariables = {
  input: CreateFraudReportInput;
  condition?: ModelFraudReportConditionInput | null;
};

export type CreateFraudReportMutation = {
  createFraudReport?: {
    __typename: "FraudReport";
    message?: string | null;
    report?: {
      __typename: "SignatureRequestReport";
      riskSummary: {
        __typename: "RiskSummary";
        score?: RiskScore | null;
      };
      requesterContext: {
        __typename: "RequesterContext";
        domain?: string | null;
        safeList?: boolean | null;
        fraudStatus?: FraudStatus | null;
        method?: string | null;
      };
      addressContexts?: string | null;
      actionContext: {
        __typename: "ActionContext";
        functionName?: string | null;
        type?: ActionType | null;
        from?: string | null;
        to?: string | null;
        chainId?: string | null;
        data?: string | null;
      };
    } | null;
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateAddressMutationVariables = {
  input: CreateAddressEntityInput;
  condition?: ModelAddressEntityConditionInput | null;
};

export type CreateAddressMutation = {
  createAddress?: {
    __typename: "AddressEntity";
    address: string;
    chainId: string;
    fraudStatus?: FraudStatus | null;
    safeList?: SafeListStatus | null;
    name?: string | null;
    type?: AddressType | null;
    isAudited?: boolean | null;
    isVerified?: boolean | null;
    url?: string | null;
    imageUrl?: string | null;
    twitter?: string | null;
    createdAt?: string | null;
    decimals?: number | null;
    abi?: string | null;
  } | null;
};

export type GetAddressInfoQueryVariables = {
  address: string;
  chainId?: string | null;
};

export type GetAddressInfoQuery = {
  getAddressInfo?: {
    __typename: "AddressEntity";
    address: string;
    chainId: string;
    fraudStatus?: FraudStatus | null;
    safeList?: SafeListStatus | null;
    name?: string | null;
    type?: AddressType | null;
    isAudited?: boolean | null;
    isVerified?: boolean | null;
    url?: string | null;
    imageUrl?: string | null;
    twitter?: string | null;
    createdAt?: string | null;
    decimals?: number | null;
    abi?: string | null;
  } | null;
};

export type GetSignatureRequestReportQueryVariables = {
  rpcSignatureRequest: RPCSignatureRequestInput;
};

export type GetSignatureRequestReportQuery = {
  getSignatureRequestReport?: {
    __typename: "SignatureRequestReport";
    riskSummary: {
      __typename: "RiskSummary";
      score?: RiskScore | null;
      findings?: Array<{
        __typename: "RiskFinding";
        type?: RiskFindingType | null;
        message?: string | null;
      } | null> | null;
    };
    requesterContext: {
      __typename: "RequesterContext";
      domain?: string | null;
      safeList?: boolean | null;
      fraudStatus?: FraudStatus | null;
      findings?: Array<{
        __typename: "RiskFinding";
        type?: RiskFindingType | null;
        message?: string | null;
      } | null> | null;
      method?: string | null;
    };
    addressContexts?: string | null;
    actionContext: {
      __typename: "ActionContext";
      functionName?: string | null;
      type?: ActionType | null;
      from?: string | null;
      to?: string | null;
      chainId?: string | null;
      data?: string | null;
      findings?: Array<{
        __typename: "RiskFinding";
        type?: RiskFindingType | null;
        message?: string | null;
      } | null> | null;
      modifiedAssets?: Array<{
        __typename: "AssetModification";
        type?: ActionType | null;
        destination?: string | null;
      } | null> | null;
      error: string;
    };
  } | null;
};

export type GetDomainInfoQueryVariables = {
  domain: string;
};

export type GetDomainInfoQuery = {
  getDomainInfo?: {
    __typename: "DomainEntity";
    domain: string;
    fraudStatus?: FraudStatus | null;
    safeList?: SafeListStatus | null;
  } | null;
};
