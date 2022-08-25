import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignatureRequestReport, TrustListStatus } from "../../constants/API";
import { updateTrustList } from "../modules/DataProvider";

const Footer = (signatureRequestReport: SignatureRequestReport) => {
  let navigate = useNavigate();

  const [muteClicked, setMuteClicked] = useState(false);

  const muteStyle = clsx(
    { "cursor-default text-slate-600 italic": muteClicked === true },
    {
      "cursor-pointer underline text-slate-700 hover:text-slate-500":
        muteClicked === false,
    },
    "text-sm pb-2 flex w-full text-center justify-center justify-items-center whitespace-pre"
  );

  return (
    <div className="w-full">
      <div
        className="flex justify-center w-full pt-2 pb-2 space-x-5 border-t-2 border-slate-900 bg-black"
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
            navigate("/report");
          }}
          className="bg-blue-700 hover:bg-blue-600 hover:border-blue-500 font-display w-32 text-white font-medium tracking-wide py-2 px-4 rounded-full"
        >
          Report
        </button>
      </div>
      <div
        className={muteStyle}
        onClick={() => {
          setMuteClicked(true);
          updateTrustList(
            signatureRequestReport.requesterContext?.domain!,
            TrustListStatus.NoPopup
          );
        }}
      >
        {muteClicked
          ? `Notifications muted for ${signatureRequestReport.requesterContext?.domain}`
          : `Trust ${signatureRequestReport.requesterContext?.domain} and hide.`}
      </div>
    </div>
  );
};
export default Footer;
