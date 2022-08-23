import Icons, { iconStates } from "./Icons";
import { findingsHelper, truncateAddress, updateWindow } from "./UIHelper";
import { loadingMessage } from "./UIHelper";
import { useState, useEffect } from "react";
import clsx from "clsx";

import {
  ActionContext,
  AddressContext,
  AddressType,
} from "../../constants/API";
import {
  CHAIN_ID_TO_BLOCKSCAN_ENDPOINTS,
  WindowRef,
} from "../../constants/Types";

interface Props {
  addressContext: AddressContext;
  actionContext: ActionContext;
}

const DetailsAddress = (props: Props) => {
  const [toggleable, setToggleable] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    updateWindow(WindowRef.body);
  });

  useEffect(() => {
    if (props.addressContext?.findings) {
      const expandable = props.addressContext.findings.length >= 1;
      setActive(expandable);
      setToggleable(expandable);
    }
  }, []);

  const iconStyle = clsx(
    {
      "transform duration-200 ease rotate-90 !text-blue-400": active === true,
    },
    {
      "transform duration-200 ease !text-slate-200":
        active === false && toggleable,
    },
    { "!text-slate-700": !toggleable },
    "w-4 h-4 text-gray-700 cursor-default"
  );
  const findingsStyle = clsx(
    { "duration-700 ease-in-out": active === true },
    { "max-h-0 duration-700 ease-in-out": active === false },
    "flex overflow-hidden transition-max-height w-full"
  );
  const containerStyle = clsx(
    { "hover:bg-[#253248] cursor-pointer": toggleable === true },
    { "hover:bg-slate-900 cursor-default": toggleable === false },
    "flex w-full py-2 px-3 bg-slate-900 rounded border border-black "
  );

  function toggleAccordion() {
    if (props.addressContext?.findings) {
      if (props.addressContext.findings.length >= 1)
        setActive((prevState) => !prevState);
    } else {
      setToggleable(false);
      setActive(false);
    }
  }

  function findings() {
    return props.addressContext?.findings ? (
      <>
        <a className="font-xs transition-opacity text-slate-500 w-full">
          <p className="pl-0.5 pr-4">
            Address Type: {props.addressContext?.type}
          </p>
        </a>
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

  const findingsList = findingsHelper(props.addressContext?.findings);

  return (
    <div className="w-full px-2 cursor-pointer">
      <div onClick={toggleAccordion} className={containerStyle}>
        <div className="flex w-full flex-wrap">
          <p className="w-full text-sm font-body font-light tracking-wide text-slate-300">
            {" "}
            {props.addressContext.type === AddressType.EOA
              ? "Account"
              : "Contract"}
            :{" "}
            <a
              className="pl-1 animate-slide-in-blurred-left text-blue-300 font-normal tracking-normal font-display underline  decoration-slate-500"
              href={
                CHAIN_ID_TO_BLOCKSCAN_ENDPOINTS[props.actionContext.chainId!] +
                "/address/" +
                props.addressContext.address +
                "#code"
              }
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              {truncateAddress(props.addressContext.name, 24) ||
                "Name Unavailable"}
            </a>
          </p>
          <div
            className="flex flex-wrap w-full text-xs font-light text-slate-400 font-body tracking-wide"
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
export default DetailsAddress;
