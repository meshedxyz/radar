// import NextPage generic type
import { useEffect, useState } from "react";
import {
  compareAddresses,
  convertAmount,
  getAssetName,
  loadingMessage,
  updateWindow,
} from "./UIHelper";
import Icons, { iconStates } from "./Icons";
import clsx from "clsx";

import {
  SignatureRequestReport,
  ActionType,
  AssetModification,
} from "../../constants/API";
import { WindowRef } from "../../constants/Types";

const DetailsModification = (sigReqReport: SignatureRequestReport) => {
  const [active, setActive] = useState(false);
  const [toggleable, setToggleable] = useState(false);

  const iconStyle = clsx(
    {
      "transform duration-200 ease rotate-90 !text-blue-200": active === true,
    },
    {
      "transform duration-200 ease !text-slate-200":
        active === false && toggleable === true,
    },
    "w-4 h-4 text-slate-700"
  );

  const findingsStyle = clsx(
    { "duration-700 ease-in-out": active === true },
    { "max-h-0 duration-700 ease-in-out": active === false },
    "flex overflow-hidden transition-max-height w-full"
  );

  const containerStyle = clsx(
    { "hover:bg-[#253248] cursor-pointer": toggleable === true },
    "flex w-full py-2 px-3 bg-slate-900 rounded border border-black !hover:bg-slate-800"
  );

  useEffect(() => {
    updateWindow(WindowRef.body);
  });

  useEffect(() => {
    if (getNames() !== undefined) {
      if (getNames()!.length > 1) {
        setToggleable(true);
        setActive(true);
      } else {
        setToggleable(false);
        setActive(false);
      }
    }
  }, []);

  function toggleAccordion() {
    if (toggleable) {
      setActive((prevState) => !prevState);
    }
  }

  const modificationsList =
    sigReqReport.actionContext.modifiedAssets?.map(
      (item: AssetModification, index: number) => {
        const assetName: string = getAssetName(
          item,
          sigReqReport.actionContext.chainId,
          sigReqReport.addressContexts
        );
        const assetAmount = convertAmount(item, sigReqReport.addressContexts);
        const assetDirection: string = compareAddresses(
          item.destination,
          sigReqReport.actionContext.from
        )
          ? "+"
          : "-";

        return (
          <div className="flex py-0.5 justify-between" key={index}>
            <p className="pl-0.5 pr-0.5 flex text-xs"> Asset: {assetName}</p>
            <p className="pl-0.5 pr-0.5 flex text-xs">
              {" "}
              {assetDirection}
              {assetAmount}
            </p>
          </div>
        );
      }
    ) || [];

  function getNames(): string[] {
    return (
      sigReqReport.actionContext?.modifiedAssets?.map((m) => {
        return getAssetName(
          m,
          sigReqReport.actionContext.chainId,
          sigReqReport.addressContexts
        );
      }) || []
    );
  }

  function modifiedAssetsNames(names: string[]) {
    if (names.join().length > 21) {
      return sigReqReport.actionContext.modifiedAssets?.length;
    }

    return names.join(", ");
  }

  function modifications() {
    return sigReqReport.actionContext?.modifiedAssets ? (
      <>
        {sigReqReport.actionContext?.modifiedAssets.length > 1 ? (
          active ? null : (
            <div className=""> View All </div>
          )
        ) : (
          <div>
            Amount Changed:
            {compareAddresses(
              sigReqReport.actionContext.modifiedAssets.at(0)?.destination,
              sigReqReport.actionContext.from
            )
              ? sigReqReport.actionContext.modifiedAssets.at(0)?.type !==
                ActionType.ApproveAll
                ? " +"
                : " -"
              : " "}
            {convertAmount(
              sigReqReport.actionContext.modifiedAssets.at(0)!,
              sigReqReport.addressContexts
            ) ?? "N/A"}{" "}
          </div>
        )}
        <div className={findingsStyle}>
          <div className="pt-2 font-xs transition-opacity text-slate-400 w-full">
            <div className="w-full border-t border-slate-700">
              <span className="flex mt-2 text-slate-300"> Modifications: </span>
            </div>
            <div className="pt-0.5">{modificationsList}</div>
          </div>
        </div>
      </>
    ) : (
      loadingMessage("Loading")
    );
  }

  return (
    <div className="w-full px-2 !text-red-500">
      <div onClick={toggleAccordion} className={containerStyle}>
        <div className="w-full flex-wrap">
          <p className="text-sm font-medium tracking-wide text-slate-300">
            {" "}
            Assets Modified:{" "}
            <a className="font-semibold tracking-normal">
              {" "}
              {modifiedAssetsNames(getNames())}
            </a>
          </p>
          <div
            className="flex flex-wrap items-center text-xs font-extralight font-body tracking-wider text-slate-400 mt-0.5"
            id="statusChecks"
          >
            {modifications()}
          </div>
        </div>
        <div className="flex place-items-center pl-4">
          <Icons id={iconStates.Expand} classDetails={iconStyle} />
        </div>
      </div>
    </div>
  );
};

export default DetailsModification;
