import { useState } from "react";

import { submitReport } from "../modules/DataProvider";
import { useEffect } from "react";
import clsx from "clsx";
import { updateWindow } from "../components/UIHelper";
import { WindowRef } from "../../constants/Types";

const Error = (props: { error?: string }) => {
  const [userReport, setUserReport] = useState<string>("");
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  useEffect(() => {
    updateWindow(WindowRef.body);
  });

  const formStyle = clsx(
    {
      "placeholder-slate-500 border-slate-600 bg-slate-300 border":
        reportSubmitted === false,
    },
    { "placeholder-slate-500 bg-slate-700": reportSubmitted === true },
    "w-full h-16 pl-3 pr-6 pt-2 text-sm rounded-lg appearance-none focus:shadow-outline"
  );

  const submissionMessageStyle = clsx(
    { hidden: reportSubmitted === false },
    "text-2xl font-semibold w-full text-slate-300 align-center flex justify-center cursor-default"
  );

  const buttonStyle = clsx(
    {
      "bg-blue-700 hover:bg-blue-600 hover:border-blue-400":
        reportSubmitted === false,
    },
    { "bg-slate-700 cursor-default": reportSubmitted === true },
    "font-display w-32 text-white font-medium tracking-wide py-2 px-4 rounded-full "
  );

  function handleSubmit() {
    submitReport(userReport);
    setReportSubmitted(true);
    setUserReport("");
  }

  return (
    <div className="w-full bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800 shadow-xl shadow-gray-900/50 rounded-b-xl border-[0.25px] border-slate-700">
      <div className="flex justify-center items-center flex-wrap h-full p-5">
        <div className="pb-5 flex w-full flex-wrap justify-center items-center">
          <div className="flex mt-6 mb-2 mx-2 justify-center h-3 w-3">
            <span className="animate-ping absolute h-1.5 w-1.5 rounded-full bg-amber-300 opacity-55"></span>
            <span className="relative rounded-full h-1.5 w-1.5 bg-amber-300"></span>
          </div>
          <p className="cursor-default text-center w-full font-bold text-2xl text-slate-300 font-display">
            Sorry!
          </p>
          <p className="cursor-default pb-3 text-center w-full font-normal text-2xl text-slate-300 font-display">
            {props?.error || "There was an issue parsing your transaction."}
          </p>

          <div className="relative inline-block w-full pt-4">
            {props?.error ? (
              <></>
            ) : (
              <>
                <form className={reportSubmitted ? "hidden" : ""}>
                  <label className="block">
                    <textarea
                      onChange={(e) => {
                        setUserReport(e.target.value);
                      }}
                      value={userReport}
                      className={formStyle}
                      disabled={reportSubmitted}
                      placeholder="Enter report context..."
                    />
                  </label>
                </form>

                <h2 className={submissionMessageStyle}> Thank You </h2>
              </>
            )}

            <div
              className="flex justify-center w-full pt-6 pb-7 space-x-5"
              id="cta"
            >
              <button
                onClick={window.close}
                className="font-display w-32 border-2 border-blue-700 hover:border-blue-400 text-white font-medium tracking-wide py-2 px-4  rounded-full"
              >
                Close
              </button>
              {props?.error ? (
                <></>
              ) : (
                <button onClick={handleSubmit} className={buttonStyle}>
                  {reportSubmitted === true ? "Submitted" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
