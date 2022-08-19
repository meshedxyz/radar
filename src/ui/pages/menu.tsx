import { useState, useEffect } from "react";
import { isFirstTimeUser, setIsFirstTimeUser } from "../modules/DataProvider";
import Carousel from "../components/FirstTimeUserCarousel";
import { NavLink } from "react-router-dom";
import { updateWindow } from "../components/UIHelper";

const Menu = () => {
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  useEffect(() => {
    isFirstTimeUser().then(setFirstTimeUser);
  }, []);

  return firstTimeUser ? (
    <div className="flex flex-wrap w-[378px] bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800 justify-center">
      <Carousel />
      <button
        onClick={() => {
          setIsFirstTimeUser().then(() => {
            setFirstTimeUser(false);
            updateWindow("root");
          });
        }}
        className="mb-5 w-5/12 mt-2  border-4 border-slate-600 bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-slate-200 font-medium tracking-wide py-2 px-4 rounded-full font-body"
      >
        Get Started
      </button>
    </div>
  ) : (
    <div className="w-full bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800 shadow-xl shadow-gray-900/50 border-[0.25px] border-slate-700">
      <div className="flex justify-center items-center flex-wrap w-[377px] h-full p-5">
        <div className="pb-5 flex w-full flex-wrap justify-center items-center">
          <div className="flex mt-6 mb-2 mx-3 justify-center h-3 w-3">
            <span className="animate-ping absolute h-1.5 w-1.5 rounded-full bg-green-300 opacity-55"></span>
            <span className="relative rounded-full h-1.5 w-1.5 bg-green-300"></span>
          </div>
          <p className="cursor-default pb-3 text-center w-full font-semibold text-2xl text-slate-300 font-display">
            Scanning
          </p>
          <NavLink
            to="trustlist"
            className="w-5/6 mt-2 mb-2 border-4 border-slate-600 bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-slate-200 font-medium tracking-wide py-2 px-4 rounded-full font-body text-center"
          >
            My Trust List
          </NavLink>
          <button className="cursor-not-allowed w-5/6 mt-2 mb-2 border-4 border-slate-700 bg-slate-700 text-slate-500 font-medium tracking-wide py-2 px-4 rounded-full font-body">
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
