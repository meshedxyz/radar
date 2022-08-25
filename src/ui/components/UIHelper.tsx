import {
  AddressContext,
  RequesterContext,
  AssetType,
  AddressType,
  ActionType,
  AssetModification,
  RiskFinding,
  SignatureRequestReport,
} from "../../constants/API";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Icons, { iconStates } from "./Icons";
import {
  ALL_AMOUNT,
  CHAIN_ID_TO_BLOCKSCAN_ENDPOINTS,
  NATIVE_ASSETS,
  REVOKE,
  UINT256_MAX,
} from "../../constants/Types";
import BadgeCheckIcon from "@heroicons/react/solid/BadgeCheckIcon";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import DetailsAddress from "./DetailsAddress";

type helperElement = {
  riskType: string;
  element: ReactElement;
};

export function getAssetName(
  item: AssetModification,
  chainId?: string,
  addressContexts?: { [address: string]: AddressContext }
): string {
  if (item.asset?.type === AssetType.Ether) {
    if (chainId) {
      return NATIVE_ASSETS[chainId];
    }
    return "Native";
  } else if (
    item.asset?.contract &&
    addressContexts &&
    addressContexts[item.asset.contract.toLowerCase()]?.name
  ) {
    return addressContexts[item.asset.contract.toLowerCase()].name!;
  }
  return "Unrecognized";
}

export function getAssetType(
  item: AssetModification,
  addressContexts?: { [address: string]: AddressContext }
): string {
  if (item.asset?.type === AssetType.Ether) {
    return "";
  } else if (
    item.asset?.contract &&
    addressContexts &&
    addressContexts[item.asset.contract.toLowerCase()]?.name
  ) {
    return addressContexts[item.asset.contract.toLowerCase()].type!;
  }
  return "Unrecognized";
}

export function getContractLink(
  sigReqReport: SignatureRequestReport,
  contract?: string | null,
  assetType?: AssetType
) {
  const chainId = sigReqReport.actionContext.chainId!;
  if (assetType === AssetType.Ether) {
    return CHAIN_ID_TO_BLOCKSCAN_ENDPOINTS[chainId] + "/txs";
  } else {
    return CHAIN_ID_TO_BLOCKSCAN_ENDPOINTS[chainId] + "/address/" + contract;
  }
}

export function getAddressContexts(sigRequestReport: SignatureRequestReport) {
  if (!!sigRequestReport.addressContexts) {
    return Object.values(sigRequestReport.addressContexts).map(
      (context: AddressContext, index: number) => (
        <div className="w-full" key={index}>
          <DetailsAddress
            addressContext={context}
            sigRequestReport={sigRequestReport}
          />
        </div>
      )
    );
  }
}

export function getAssetModifications(sigReqReport: SignatureRequestReport) {
  return (
    sigReqReport.actionContext.modifiedAssets?.map(
      (item: AssetModification, index: number) => {
        const assetName: string = getAssetName(
          item,
          sigReqReport.actionContext.chainId,
          sigReqReport.addressContexts
        );
        const assetType: string = getAssetType(
          item,
          sigReqReport.addressContexts
        );
        const assetAmount = convertAmount(item, sigReqReport.addressContexts);
        const assetSafe = isSafelisted(item, sigReqReport.addressContexts);

        const assetDirection: string = [REVOKE].some(
          (element) => element === assetAmount
        )
          ? " "
          : compareAddresses(item.destination, sigReqReport.actionContext.from)
          ? "+"
          : "-";

        return (
          <div
            className="text-zinc-50 text-xl w-full mt-4 mb-3 px-2 relative "
            key={index}
          >
            <div className="absolute -top-3 left-4 bg-slate-800 rounded-full border-slate-700 border shadow">
              <p className="text-xs px-3 py-0.5 text-slate-500">{item.type}</p>
            </div>
            <div className="flex w-full justify-between  h-16 rounded-lg bg-slate-900  shadow-lg">
              <div className=" shrink no-wrap pl-4 self-center">
                <p className="flex font-semibold text-base tracking-wide truncate">
                  {assetName}
                  <BadgeCheckIcon
                    className={
                      (assetSafe ? "text-blue-500" : "hidden") +
                      " w-6 h-6 pl-1.5 self-center"
                    }
                  />
                  <a
                    href={getContractLink(
                      sigReqReport,
                      item.asset?.contract,
                      item.asset?.type
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLinkIcon className="w-6 h-6 pl-1.5 self-center text-zinc-700 hover:text-zinc-600" />
                  </a>
                </p>
                <p className="flex font-medium text-xs text-slate-700 -mt-0.5">
                  {assetType}
                </p>
              </div>
              <div className="no-wrap pr-4 self-center font-semibold text-xs tracking-wide justify-end  text-right">
                <p
                  className={
                    ["+", " "].some((element) => element === assetDirection)
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {assetDirection}
                  {assetAmount}
                </p>
                {item.asset?.tokenId && item.asset?.tokenId !== ALL_AMOUNT ? (
                  <p
                    className={
                      (assetDirection === "+"
                        ? "text-green-500/50"
                        : "text-red-500/50") +
                      " font-medium text-xs tracking-tight text-right justify-end -mt-1 truncate w-14"
                    }
                  >
                    #{item.asset?.tokenId}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        );
      }
    ) || []
  );
}

export function isSafelisted(
  item: AssetModification,
  addressContexts?: { [address: string]: AddressContext }
): boolean {
  if (item.asset?.type === AssetType.Ether) {
    return true;
  }
  return (
    !!item.asset?.contract &&
    !!addressContexts &&
    !!addressContexts[item.asset.contract.toLowerCase()]?.safeList
  );
}

export function convertAmount(
  modification: AssetModification,
  addressContexts?: { [address: string]: AddressContext }
) {
  if (
    modification.type === ActionType.Unapprove ||
    (modification.type === ActionType.Approve &&
      modification.asset?.amount === "0")
  ) {
    return REVOKE;
  }

  if (
    modification.asset?.amount === UINT256_MAX ||
    modification.asset?.amount === ALL_AMOUNT
  ) {
    return ALL_AMOUNT;
  }

  if (modification?.asset?.type === AssetType.Token) {
    if (modification.asset?.contract) {
      if (
        addressContexts &&
        addressContexts[modification.asset.contract.toLowerCase()].type ===
          AddressType.ERC20 &&
        modification.asset.amount
      ) {
        if (
          addressContexts &&
          addressContexts[modification.asset.contract.toLowerCase()].decimals
        ) {
          return (
            parseFloat(modification.asset.amount) /
            10 **
              addressContexts![modification.asset.contract.toLowerCase()]
                .decimals!
          ).toFixed(3);
        }
      }
    }
    return modification.asset.amount;
  } else if (modification?.asset?.type === AssetType.Ether) {
    if (modification.asset.amount) {
      return (parseFloat(modification.asset.amount) / 10 ** 18).toFixed(3);
    }
  }
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function truncateAddress(str: string | null | undefined, num: number) {
  if (str) {
    if (str.length <= num) {
      return str;
    }
    if (str.substring(0, 2) == "0x") {
      return str.substring(0, 4) + "..." + str.slice(-4).toUpperCase();
    }
    return str.slice(0, num) + "...";
  }
}

export function safeListHelper(
  x: RequesterContext | AddressContext | null | undefined
): helperElement {
  if (x?.safeList === true) {
    return {
      riskType: "Positive",
      element: <a className="font-light text-green-100/75"> On Safelist</a>,
    };
  }
  if (x?.safeList === false) {
    return {
      riskType: "Negative",
      element: <p className="text-red-100 font-light"> No Safelist Entry</p>,
    };
  }
  return {
    riskType: "N/A",
    element: <p className="font-light"> Safelist Loading </p>,
  };
}

export function auditHelper(
  x: RequesterContext | null | undefined
): helperElement {
  if (x?.safeList === true) {
    return {
      riskType: "Positive",
      element: (
        <a className="text-green-100 font-light underline decoration-green-200/50">
          View
        </a>
      ),
    };
  }
  if (x?.safeList === false) {
    return {
      riskType: "Negative",
      element: <a className="font-light text-red-100">None</a>,
    };
  }
  return {
    riskType: "N/A",
    element: <a> N/A </a>,
  };
}

export function fraudHelper(
  x: RequesterContext | null | undefined
): helperElement {
  if (x?.fraudStatus === "None") {
    return {
      riskType: "Positive",
      element: <a className="font-light text-green-100"> No Fraud Reported </a>,
    };
  }
  if (x?.fraudStatus === "ActiveFraud") {
    return {
      riskType: "Negative",
      element: <a className=" text-red-100 font-light"> Fraud Reported </a>,
    };
  }
  if (x?.fraudStatus === "Investigating") {
    return {
      riskType: "Neutral",
      element: (
        <a className="text-amber-100 font-light">
          {" "}
          Suspicious Activity Reported
        </a>
      ),
    };
  }
  if (x?.fraudStatus === "OwnerReported") {
    return {
      riskType: "Negative",
      element: <a className="text-red-100 font-light"> Fraud Reported</a>,
    };
  }
  return {
    riskType: "N/A",
    element: <a className="font-light"> Not Available </a>,
  };
}

export function findingsHelper(findings?: RiskFinding[]) {
  return (
    findings?.map((item: RiskFinding, index: number) => {
      return (
        <div className="flex py-0.5" key={index}>
          <Icons id={iconStates[item.type]} classDetails={"w-4 h-4"} />
          <p className="pl-0.5 pr-0.5 flex text-xs"> {item.message} </p>
        </div>
      );
    }) || []
  );
}

export function translateAction(actionType?: ActionType) {
  switch (actionType) {
    case ActionType.Approve:
      return "Approval";
    case ActionType.ApproveAll:
      return "Approve All";
    case ActionType.Burn:
      return "Burn";
    case ActionType.Buy:
      return "Purchase";
    case ActionType.Mint:
      return "Mint";
    case ActionType.ProxyUpdate:
      return "Update";
    case ActionType.Multicall:
      return "Multicall";
    case ActionType.RenounceOwnership:
      return "Renounce ownership";
    case ActionType.SetRoyalty:
      return "Set Royalty";
    case ActionType.TransferOwnership:
      return "Transfer";
    case ActionType.Transfer:
      return "Transfer";
    case ActionType.TransferEth:
      return "Send ETH";
    case ActionType.Vote:
      return "Vote";
    case ActionType.Unapprove:
      return "Revoke Access";
    case ActionType.Sell:
      return "Sale";
    case ActionType.Swap:
      return "Swap";
    case ActionType.Unknown:
      return "Custom Function";
    case ActionType.SignMessage:
      return "Sign Message";
  }
  return "Custom Function";
}

export function loadingMessage(message: string) {
  return (
    <p className="flex flex-wrap text-xs font-normal text-slate-400">
      {message}
      <div className="loader flex space-x-0.5 items-end pb-1 pl-0.5">
        <div className="w-0.5 h-0.5 bg-gradient-to-r from-blue-200 to-slate-400 rounded-full animate-bounce"></div>
        <div className="w-0.5 h-0.5 bg-gradient-to-r from-blue-200 to-slate-400 rounded-full animate-bounce"></div>
        <div className="w-0.5 h-0.5 bg-gradient-to-r from-blue-200 to-slate-400 rounded-full animate-bounce"></div>
      </div>
    </p>
  );
}

export const compareAddresses = (
  addr1: string | null | undefined,
  addr2: string | null | undefined
): boolean => {
  if (!addr1 || !addr2) {
    return false;
  }
  return addr1.toLowerCase() === addr2.toLowerCase();
};

export function updateWindow(element: string) {
  const mainRef = document.getElementById(element);
  if (mainRef) {
    const newSize = mainRef.clientHeight + 29;
    if (newSize != window.outerHeight) {
      window.resizeTo(window.innerWidth, newSize);
    }
  }
}
