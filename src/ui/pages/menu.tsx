import { useState, useEffect } from "react";
import {
  isFirstTimeUser,
  setFirstTimeUserExperienceCompleted,
} from "../modules/DataProvider";
import Carousel from "../components/FirstTimeUserCarousel";
import { NavLink } from "react-router-dom";
import { updateWindow } from "../components/UIHelper";
import { WindowRef } from "../../constants/Types";

const Menu = () => {
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  useEffect(() => {
    isFirstTimeUser().then(setFirstTimeUser);
  }, []);

  return firstTimeUser ? (
    <div className="flex flex-wrap w-[378px]  bg-gradient-to-tr from-black to-slate-900 justify-center">
      <Carousel />
      <button
        onClick={() => {
          setFirstTimeUserExperienceCompleted().then(() => {
            setFirstTimeUser(false);
            updateWindow(WindowRef.root);
          });
        }}
        className="mb-5 w-5/12 mt-2  border-4 border-slate-600 bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-slate-200 font-medium tracking-wide py-2 px-4 rounded-full font-body"
      >
        Get Started
      </button>
    </div>
  ) : (
    <div className="w-full bg-gradient-to-tr from-black to-slate-900 shadow-xl shadow-gray-900/50 border-[0.25px] border-slate-700">
      <div className="flex justify-center items-center flex-wrap w-[377px] h-full p-5">
        <div className="pb-5 flex w-full flex-wrap justify-center items-center">
          <NavLink
            to="trustlist"
            className="w-5/6 mt-2 mb-2 border-4 border-slate-600 bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-slate-200 font-medium tracking-wide py-2 px-4 rounded-full font-body text-center"
          >
            My Trust List
          </NavLink>
          <NavLink
            to="history"
            className="w-5/6 mt-2 mb-2 border-4 border-slate-600 bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-slate-200 font-medium tracking-wide py-2 px-4 rounded-full font-body text-center"
          >
            View History
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
