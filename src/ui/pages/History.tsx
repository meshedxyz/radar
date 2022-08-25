import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getReportHistory, removeReportHistory } from "../modules/DataProvider";
import Icons, { iconStates } from "../components/Icons";
import {
  HistoricalSignatureRequestReport,
  REPORT_HISTORY_PAGE_SIZE,
} from "../../constants/Types";

const History = () => {
  let navigate = useNavigate();

  const [history, setHistory] = useState<HistoricalSignatureRequestReport[]>(
    []
  );
  const [allHistoryFetched, setAllHistoryFetched] = useState<boolean>(false);

  useEffect(() => {
    historyLoader();
  }, []);

  const historyLoader = () =>
    getReportHistory(history.length).then((h) => {
      const returnedLength = h?.length ?? 0;
      if (returnedLength) {
        setHistory((prev) => {
          return [...prev, ...h];
        });
      }

      if (returnedLength < REPORT_HISTORY_PAGE_SIZE) {
        setAllHistoryFetched(true);
      }
    });

  return (
    <div className="w-full bg-gradient-to-tr from-black to-slate-900 shadow-xl shadow-gray-900/50 border-[0.25px] border-slate-700">
      <div className="w-[377px] h-[400px] px-4 pt-3 font-display overflow-y-scroll overflow-x-hidden pb-3 justify-center">
        <div className="flex pt-2 justify-between font-medium text-slate-300 border-b border-b-slate-700 text-sm ">
          <a className="w-28 cursor-default">Domain</a>
          <a className="w-28 cursor-default">Report Date</a>
          <a className=" cursor-default">Delete</a>
        </div>
        {history?.length ? (
          history.map((historicalReport, index) => {
            return (
              <li
                key={index}
                className="flex pt-2 justify-between font-body text-slate-400 hover:text-slate-300 transition-all cursor-pointer"
              >
                <a
                  className="font-body text-sm text-bold truncate w-28"
                  onClick={() => {
                    navigate("/report", {
                      state: historicalReport,
                    });
                  }}
                >
                  {historicalReport.report?.requesterContext?.domain ||
                    "Unknown"}
                </a>
                <a
                  className="font-body text-sm truncate w-28"
                  onClick={() => {
                    navigate("/report", {
                      state: historicalReport,
                    });
                  }}
                >
                  {new Date(historicalReport.date).toLocaleDateString()}
                </a>

                <div className="flex flex-wrap">
                  <button
                    onClick={(e) => {
                      setHistory((h) => {
                        e.stopPropagation();
                        return h.filter((_, k) => {
                          return k !== index;
                        });
                      });
                      removeReportHistory(historicalReport.key);
                    }}
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
            No items in your history.
          </p>
        )}
      </div>
      <div className="flex w-full pb-2">
        <button
          onClick={historyLoader}
          disabled={allHistoryFetched}
          className="font-display w-32 border-2 border-blue-700 hover:border-blue-400 text-white font-medium tracking-wide py-2 px-4 rounded-full justify-center mx-auto disabled:hidden"
        >
          Load More
        </button>
      </div>
    </div>
  );
};
export default History;
