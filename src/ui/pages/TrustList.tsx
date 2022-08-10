import { TrustList, TrustListStatus } from "../../constants/API";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  getTrustList,
  updateTrustList,
  removeFromTrustList,
} from "../modules/DataProvider";
import Icons, { iconStates } from "../components/Icons";

const TrustList = () => {
  const [trustList, setTrustList] = useState<TrustList>();

  useEffect(() => {
    getTrustList().then(setTrustList);
  }, []);

  function handleChange(event: any) {
    if (event.target.id) {
      const newStatus =
        event.target.value === "0"
          ? TrustListStatus.Trusted
          : TrustListStatus.NoPopup;
      updateTrustList(event.target.id, newStatus).then(() => {
        getTrustList().then(setTrustList);
      });
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800 shadow-xl shadow-gray-900/50 border-[0.25px] border-slate-700">
      <div className="w-[377px] h-full px-4 pt-3 font-display overflow-y-scroll overflow-x-hidden">
        <div className="flex justify-between">
          <h1 className="flex text-xl font-bold justify-start text-slate-300 tracking-wider mr-3">
            Trust List
          </h1>

          <NavLink to="/">
            <Icons
              id={iconStates.Back}
              classDetails="w-5 h-5 self-center hover:text-slate-300 text-slate-400"
            />
          </NavLink>
        </div>
        <div className="flex pt-2 justify-between font-body text-slate-600 border-b border-b-slate-700 mr-3">
          <a className="font-body italic cursor-default">Domain</a>
          <a className="font-body italic cursor-default">Hide/Show</a>
        </div>
        {trustList && Object.keys(trustList).length ? (
          Object.keys(trustList!).map((domain, index) => {
            return (
              <li
                key={index}
                className="flex pt-2 justify-between font-body text-slate-400"
              >
                <a className="font-body text-sm">{domain}</a>
                <div className="flex flex-wrap">
                  <label
                    htmlFor={domain}
                    className="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={trustList[domain]}
                      onChange={handleChange}
                      id={domain}
                      className="sr-only peer"
                      defaultChecked={
                        TrustListStatus.NoPopup !== trustList[domain]
                      }
                    />
                    <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                  <button
                    onClick={() =>
                      removeFromTrustList(domain).then(() => {
                        getTrustList().then(setTrustList);
                      })
                    }
                    className="pl-3"
                  >
                    <Icons
                      id={iconStates.Trash}
                      classDetails="w-5 h-5 hover:text-red-500"
                    />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p className="pt-1 text-sm font-normal text-slate-400">
            No items on your trust list.
          </p>
        )}
      </div>
    </div>
  );
};
export default TrustList;
