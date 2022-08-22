import { useContext, useEffect } from "react";
import { AssetModification, SignatureRequestReport } from "../../constants/API";
import { stateContext } from "../App";
import { BadgeCheckIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import Footer from "./Footer";
import SummaryAnalysis from "./SummaryAnalysis";
import {
  compareAddresses,
  convertAmount,
  getAssetLink,
  getAssetName,
  getAssetType,
  isSafelisted,
  updateWindow,
} from "./UIHelper";
import { ALL_AMOUNT, REVOKE } from "../../constants/Types";

const Summary = (sigReqReport: SignatureRequestReport) => {
  useEffect(() => {
    updateWindow("body");
  });

  const uniqueModifications = [
    ...new Map(
      sigReqReport.actionContext.modifiedAssets?.map((item) => [
        item.asset?.contract,
        item,
      ])
    ).values(),
  ];
  console.log(uniqueModifications);

  const modificationsList =
    uniqueModifications.map((item: AssetModification, index: number) => {
      const assetName: string = getAssetName(
        item,
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
        <div className="text-zinc-50 text-xl w-full my-2 px-2 " key={index}>
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
                  href={getAssetLink(item)}
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
    }) || [];

  return (
    <>
      <div className="flex flex-col h-[440px] relative justify-center">
        <div className="self-center w-full">
          <SummaryAnalysis {...sigReqReport} />
          <div className="flex justify-center w-full">
            {modificationsList?.length >= 1 ? (
              <h1 className="font-semibold text-base text-slate-600">
                Pending Changes
              </h1>
            ) : null}
          </div>
          {modificationsList}
        </div>
      </div>
      <Footer {...sigReqReport} />
    </>
  );
};

export default Summary;
