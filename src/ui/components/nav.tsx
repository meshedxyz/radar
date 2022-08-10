import { NavLink } from "react-router-dom";

const Nav = () => {
  const logo = require("../../static/icons/radar-128.png");
  const activeLinkClass =
    "text-zinc-50 underline decoration-2 underline-offset-[21px] decoration-blue-500 text-lg font-semibold tracking-wide";
  const inactiveLinkClass = "text-zinc-700 text-lg font-semibold tracking-wide";

  return (
    <>
      <div className="flex justify-between bg-black">
        <img src={logo} className="w-[40px] m-2" />
        <div className=" space-x-4 mx-2 self-center">
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
            to="report"
          >
            Report
          </NavLink>
        </div>
        <div className="w-[40px] m-2"></div>
      </div>

      <div className="bg-slate-700 h-[2px] w-full"></div>
    </>
  );
};

export default Nav;
