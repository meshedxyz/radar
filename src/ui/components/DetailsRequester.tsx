import Icons, { iconStates } from "./Icons";
import { SignatureRequestReport } from "../../constants/API";
import { loadingMessage, findingsHelper } from "./UIHelper";
import { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { stateContext } from "../App";
import { truncateString } from "./UIHelper";

const DetailsRequester = (signatureRequestReport: SignatureRequestReport) => {
  const { requesterContext } = signatureRequestReport;
  const [active, setActive] = useState(false);
  const { updateWindow } = useContext(stateContext);

  useEffect(() => {
    updateWindow();
  });

  const iconStyle = clsx(
    {
      "transform duration-200 ease rotate-90 !text-blue-400": active === true,
    },
    {
      "transform duration-200 ease !text-slate-200":
        active === false && signatureRequestReport.requesterContext?.findings,
    },
    {
      "!text-slate-700":
        signatureRequestReport.requesterContext?.findings != null &&
        signatureRequestReport.requesterContext?.findings!.length <= 1,
    },
    "w-4 h-4 text-gray-700 cursor-default"
  );
  const findingsStyle = clsx(
    { "duration-700 ease-in-out": active === true },
    { "max-h-0 duration-700 ease-in-out": active === false },
    "flex overflow-hidden transition-max-height w-full"
  );

  const containerStyle = clsx(
    {
      "hover:bg-slate-800":
        signatureRequestReport.requesterContext?.findings != null &&
        signatureRequestReport.requesterContext?.findings!.length <= 1,
    },
    "flex w-full py-2 px-3 bg-slate-900 rounded border border-black cursor-default hover:bg-[#253248]"
  );

  function toggleAccordion() {
    if (signatureRequestReport.requesterContext?.findings) {
      if (signatureRequestReport.requesterContext?.findings!.length > 1) {
        setActive((prevState) => !prevState);
      }
    }
  }

  function findings() {
    return (
      <>
        {signatureRequestReport.requesterContext?.findings ? (
          <>
            {signatureRequestReport.requesterContext?.findings.length < 1 ? (
              <div className="">{findingsList}</div>
            ) : active ? (
              <div className="mt-1 border-slate-700">
                <span className="flex text-slate-300 mt-0.5 font-extralight">
                  {" "}
                  Findings:{" "}
                </span>
              </div>
            ) : (
              findingsList.at(0)
            )}
            <div className={findingsStyle}>
              <div className=" font-xs transition-opacity text-slate-400 w-full">
                <div className="pt-0.5">{findingsList}</div>
              </div>
            </div>
          </>
        ) : (
          loadingMessage("Loading")
        )}
      </>
    );
  }

  const findingsList = findingsHelper(requesterContext?.findings);

  return (
    <div className="w-full px-2 cursor-pointer">
      <div onClick={toggleAccordion} className={containerStyle}>
        <div className="flex w-full flex-wrap">
          <p className="flex text-sm text-slate-300 font-medium tracking-wide">
            Requester:{" "}
            <a
              className="pl-0.5 animate-slide-in-blurred-left decoration-2 tracking-normal font-semibold underline decoration-slate-500 font-display text-blue-300"
              target="_blank"
              rel="noreferrer"
              href={"https://www." + requesterContext?.domain || ""}
            >
              {" "}
              {truncateString(
                requesterContext?.domain
                  ?.replace(/(^\w+:|^)\/\//, "")
                  .replace(/\/+$/, "") || "",
                25
              )}
            </a>
          </p>
          <div
            className="flex flex-wrap w-full text-xs font-light text-slate-400 font-body tracking-wide"
            id="statusChecks"
          >
            {findings()}
          </div>
        </div>
        <button className="flex place-items-center">
          <Icons id={iconStates.Expand} classDetails={iconStyle} />
        </button>
      </div>
    </div>
  );
};

export default DetailsRequester;
