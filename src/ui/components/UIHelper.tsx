import {
  AddressContext,
  RequesterContext,
  AssetType,
  AddressType,
  ActionType,
  AssetModification,
  RiskFinding,
} from "../../constants/API";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Icons, { iconStates } from "./Icons";
import { ALL_AMOUNT, UINT256_MAX } from "../../constants/Types";

type helperElement = {
  riskType: string;
  element: ReactElement;
};

export function getAssetName(
  item: AssetModification,
  addressContexts?: { [address: string]: AddressContext }
): string {
  if (item.asset?.type === AssetType.Ether) {
    return "ETH";
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

export function getAssetLink(item: AssetModification) {
  if (item.asset?.type === AssetType.Ether) {
    return "https://etherscan.io/txs";
  } else {
    return "https://etherscan.io/address/" + item.asset?.contract;
  }
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
    modification.asset?.amount === UINT256_MAX ||
    modification.asset?.amount === ALL_AMOUNT
  ) {
    return "All";
  }

  if (
    modification.type === ActionType.Unapprove ||
    (modification.type === ActionType.Approve &&
      modification.asset?.amount === "0")
  ) {
    return "Revoke";
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

export function verifiedHelper(
  x: RequesterContext | null | undefined,
  y: AddressContext
): helperElement {
  if (x?.safeList === true) {
    return {
      riskType: "Positive",
      element: (
        <a
          className="text-green-100 font-light underline decoration-green-200/50"
          href={"https://etherscan.io/address/" + y?.address + "#code"}
          target="_blank"
          rel="noreferrer"
        >
          View 1
        </a>
      ),
    };
  }
  if (x?.safeList === false) {
    return {
      riskType: "Negative",
      element: <a className="text-red-100 font-light">Contract Unverified</a>,
    };
  }
  return {
    riskType: "N/A",
    element: <a></a>,
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
