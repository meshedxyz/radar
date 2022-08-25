import { useEffect } from "react";
import { AssetModification, SignatureRequestReport } from "../../constants/API";

import { BadgeCheckIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import Footer from "./Footer";
import SummaryAnalysis from "./SummaryAnalysis";
import { getAssetModifications, updateWindow } from "./UIHelper";
import { WindowRef } from "../../constants/Types";

const Summary = (sigReqReport: SignatureRequestReport) => {
  useEffect(() => {
    updateWindow(WindowRef.body);
  });

  const modificationsList = getAssetModifications(sigReqReport);

  return (
    <>
      <div className="flex flex-col h-[440px] relative justify-center">
        <div className="self-center w-full">
          <SummaryAnalysis {...sigReqReport} />
          <div className="flex justify-center w-full">
            {modificationsList?.length >= 1 ? (
              <h1 className="font-semibold text-base text-slate-600">
                Pending Changes
              </h1>
            ) : null}
          </div>
          {modificationsList}
        </div>
      </div>
      <Footer {...sigReqReport} />
    </>
  );
};

export default Summary;
