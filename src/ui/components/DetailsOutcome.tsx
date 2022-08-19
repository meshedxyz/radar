import { useState } from "react";
import { SignatureRequestReport, ActionType } from "../../constants/API";
import {
  findingsHelper,
  loadingMessage,
  translateAction,
  truncateAddress,
  updateWindow,
} from "./UIHelper";
import Icons, { iconStates } from "./Icons";
import clsx from "clsx";
import { useEffect } from "react";
import { ZERO_ADDRESS } from "../../constants/Types";

const DetailOutcome = (sigReqReport: SignatureRequestReport) => {
  const [active, setActive] = useState(false);
  const [toggleable, setToggleable] = useState(false);

  useEffect(() => {
    updateWindow("body");
  });

  useEffect(() => {
    const expandable = !!sigReqReport.actionContext?.findings?.length;
    setToggleable(expandable);
    setActive(expandable);
  }, []);

  const iconStyle = clsx(
    {
      "transform duration-200 ease rotate-90 !text-blue-200": active === true,
    },
    {
      "transform duration-200 ease !text-slate-200":
        active === false && toggleable,
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
    { "hover:bg-slate-800 cursor-default": toggleable === false },
    "flex w-full py-2 px-3 bg-slate-900 rounded border border-black "
  );

  function toggleAccordion() {
    if (toggleable) {
      setActive((prevState) => !prevState);
    }
  }

  function destination() {
    if (
      !sigReqReport.actionContext?.to ||
      sigReqReport.actionContext?.to === ZERO_ADDRESS
    ) {
      return <></>;
    } else {
      return (
        <>
          {" "}
          To:{" "}
          <a
            className="animate-slide-in-blurred-left font-light pr-2 text-blue-300/75 underline decoration-blue-300/25"
            href={
              "https://etherscan.io/address/" + sigReqReport.actionContext.to
            }
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {truncateAddress(sigReqReport.actionContext?.to, 20) || ""}
          </a>
        </>
      );
    }
  }

  function findings() {
    return sigReqReport.requesterContext?.findings ? (
      <>
        <div className="font-xs transition-opacity text-slate-500 w-full">
          <p className="pl-0.5 pr-4">{destination()}</p>
        </div>
        <div className={findingsStyle}>
          <div className="pt-2 font-xs transition-opacity text-slate-400 w-full">
            <div className="w-5/6 border-t border-slate-700">
              <span className="flex mt-2 text-slate-300"> Findings: </span>
            </div>
            <div className="pt-0.5">{findingsList}</div>
          </div>
        </div>
      </>
    ) : (
      loadingMessage("Loading")
    );
  }

  function action() {
    if (sigReqReport.actionContext.type !== ActionType.Unknown) {
      return translateAction(sigReqReport.actionContext?.type);
    } else if (sigReqReport.actionContext.functionName) {
      return sigReqReport.actionContext.functionName;
    } else {
      return "Custom Function";
    }
  }

  const findingsList = findingsHelper(sigReqReport.actionContext?.findings);

  return (
    <div className="w-full px-2 !text-red-500">
      <div onClick={toggleAccordion} className={containerStyle}>
        <div className="w-full flex-wrap">
          <p className="text-sm font-medium tracking-wide text-slate-300">
            {" "}
            Action Taken:{" "}
            <a className="font-semibold tracking-normal capitalize">
              {" "}
              {action()}{" "}
            </a>
          </p>
          <div
            className="flex flex-wrap items-center text-xs font-extralight font-body tracking-wider text-slate-400 mt-0.5"
            id="statusChecks"
          >
            {findings()}
          </div>
        </div>
        <div className="flex place-items-center">
          <Icons id={iconStates.Expand} classDetails={iconStyle} />
        </div>
      </div>
    </div>
  );
};

export default DetailOutcome;
