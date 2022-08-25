import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { SignatureRequestReport } from "../../constants/API";

const ReportNav = (props: {
  reports: SignatureRequestReport[];
  current: number;
  setCurrent: { (n: number): void };
}) => {
  const logo = require("../../static/icons/radar-128.png");
  const activeLinkClass =
    "text-zinc-50 underline decoration-2 underline-offset-[25px] decoration-blue-500 text-base font-semibold tracking-wide";
  const inactiveLinkClass =
    "text-zinc-700 text-base font-semibold tracking-wide";

  const reportSelector = (
    <div className="flex flex-wrap justify-center self-center">
      <button type="button" onClick={() => props.setCurrent(props.current - 1)}>
        <span role="img" aria-label={`Previous Report`}>
          <ChevronLeftIcon className="h-5 w-5 text-white hover:text-blue-500" />
        </span>
      </button>
      <a className="text-white self-center text-center align-middle text-sx">
        {props.current + 1}/{props.reports.length}
      </a>

      <button type="button" onClick={() => props.setCurrent(props.current + 1)}>
        <span role="img" aria-label={`Next Report`}>
          <ChevronRightIcon className="h-5 w-5 text-zinc-50 hover:text-blue-500" />
        </span>
      </button>
    </div>
  );
  return (
    <>
      <div className="flex justify-between bg-black h-16">
        <img
          src={logo}
          className="w-[40px] h-[40px] m-2 justify-center self-center"
        />
        <div className=" space-x-4  self-center">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : inactiveLinkClass
            }
            id="action"
            to="/"
          >
            Summary
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : inactiveLinkClass
            }
            to="details"
          >
            Details
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : inactiveLinkClass
            }
            to="notify"
          >
            Report
          </NavLink>
        </div>
        <div
          className={props.reports.length < 1 ? "w-[40px] flex" : "flex mr-2"}
        >
          {props.reports.length < 1 ? <></> : reportSelector}
        </div>
      </div>
      <div className="bg-slate-700 h-[2px] w-full"></div>
    </>
  );
};

export default ReportNav;
