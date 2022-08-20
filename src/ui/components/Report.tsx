import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { submitReport, updateTrustList } from "../modules/DataProvider";
import { SignatureRequestReport, TrustListStatus } from "../../constants/API";
import { updateWindow } from "./UIHelper";

const Report = (props: SignatureRequestReport) => {
  const form = useRef(null);
  const [userReport, setUserReport] = useState<string>("");
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const [muteClicked, setMuteClicked] = useState(false);

  const muteStyle = clsx(
    { "cursor-default text-slate-600 italic": muteClicked === true },
    {
      "cursor-pointer underline text-slate-700 hover:text-slate-500":
        muteClicked === false,
    },
    "text-sm pb-2 flex w-full text-center justify-center justify-items-center whitespace-pre"
  );

  function handleSubmit() {
    submitReport(userReport);
    setReportSubmitted(true);
    setUserReport("");
  }

  useEffect(() => {
    updateWindow("body");
  });

  const buttonStyle = clsx(
    {
      "bg-blue-700 hover:bg-blue-600 hover:border-blue-400":
        reportSubmitted === false,
    },
    { "bg-slate-700 cursor-default": reportSubmitted === true },
    "font-display w-32 text-white font-medium tracking-wide py-2 px-4 rounded-full "
  );

  const formStyle = clsx(
    {
      "placeholder-slate-500 border-slate-600 bg-slate-300 border":
        reportSubmitted === false,
    },
    { "placeholder-slate-500 bg-slate-700": reportSubmitted === true },
    "w-full h-48 pl-3 pr-6 pt-2 text-sm rounded-lg appearance-none focus:shadow-outline"
  );

  const submissionMessage = clsx(
    { hidden: reportSubmitted === false },
    "text-2xl font-semibold w-full text-slate-300 align-center flex justify-center cursor-default"
  );

  return (
    <>
      <div className="flex flex-col h-[440px] relative justify-center">
        <div className="relative inline-block w-full px-5 pt-4">
          <h1 className="font-semibold text-base text-slate-600 pb-2 justify-center text-center">
            Report Suspicious Activity
          </h1>

          <form ref={form} className={reportSubmitted ? "hidden" : ""}>
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
          <h2 className={submissionMessage}> Thank You </h2>
        </div>
      </div>
      <div
        className="flex justify-center w-full pt-4 pb-3 space-x-5 border-t-2 border-slate-800 bg-black"
        id="cta"
      >
        <button
          onClick={window.close}
          className="font-display w-32 border-2 border-blue-700 hover:border-blue-400 text-white font-medium tracking-wide py-2 px-4  rounded-full"
        >
          Close
        </button>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className={buttonStyle}
        >
          {reportSubmitted === true ? "Submitted" : "Submit"}
        </button>
      </div>
      <div
        className={muteStyle}
        onClick={() => {
          setMuteClicked(true);
          updateTrustList(
            props.requesterContext?.domain!,
            TrustListStatus.NoPopup
          );
        }}
      >
        {muteClicked ? "Notifications muted for" : "Don't show again for"}
        <a> {props.requesterContext?.domain}</a>
      </div>
    </>
  );
};

export default Report;
