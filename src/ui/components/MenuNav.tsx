import { useLocation, useNavigate } from "react-router-dom";
import Icons, { iconStates } from "./Icons";

const MenuNav = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const logo = require("../../static/icons/radar-128.png");

  const MENU_NAMES: { [key: string]: string } = {
    "/": "Settings",
    "/trustlist": "Trust List",
    "/history": "Report History",
    "/report": "Report History",
  };

  return (
    <>
      <div className="flex justify-between bg-black h-16">
        <div className="flex flex-wrap">
          <img
            src={logo}
            className="w-[40px] h-[40px] m-2 justify-center self-center"
          />
          <div className="absolute top-[28px] left-[22px] flex justify-center h-3 w-3">
            <span className="animate-ping absolute h-2 w-2 rounded-full bg-blue-600 opacity-55"></span>
            <span className="relative rounded-full h-2 w-2 bg-blue-600"></span>
          </div>
          <h1 className="text-xl font-bold justify-start text-slate-100 tracking-wider mr-3 self-center cursor-default">
            {MENU_NAMES[location.pathname]}
          </h1>
        </div>
        <div
          className={
            location.pathname !== "/" ? "space-x-4 mx-2 self-center" : "hidden"
          }
        >
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icons
              id={iconStates.Back}
              classDetails="w-5 h-5 self-center hover:text-slate-300 text-slate-400"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuNav;
