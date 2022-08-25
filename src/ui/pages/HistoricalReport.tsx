// import NextPage generic type

import { useLocation } from "react-router-dom";
import { HistoricalSignatureRequestReport } from "../../constants/Types";
import {
  getAddressContexts,
  getAssetModifications,
} from "../components/UIHelper";
import SummaryAnalysis from "../components/SummaryAnalysis";
import DetailOutcome from "../components/DetailsOutcome";
import DetailsRequester from "../components/DetailsRequester";

const HistoricalReport = () => {
  const historicalReport = useLocation()
    ?.state as HistoricalSignatureRequestReport;

  const modificationsList = getAssetModifications(historicalReport.report);

  return (
    <div className="w-[377px] h-[440px] bg-gradient-to-t from-black via-black to-slate-900  shadow-gray-900/50  border-[0.25px] border-slate-700 overflow-y-visible">
      <div className="h-[400px] overflow-y-auto overscroll-x-none border-b border-slate-600">
        <div className="pt-4">
          <SummaryAnalysis {...historicalReport.report} />
        </div>
        <div className="flex justify-center w-full">
          {modificationsList?.length >= 1 ? (
            <h1 className="font-semibold text-base text-slate-600">
              Pending Changes
            </h1>
          ) : null}
        </div>
        {modificationsList}
        <div className="flex justify-center w-full pt-3 pb-2">
          <h1 className="font-semibold text-base text-slate-600">
            Signature Details
          </h1>
        </div>
        <div className="pb-2">
          <DetailsRequester {...historicalReport.report} />
          <DetailOutcome {...historicalReport.report} />
          {getAddressContexts(historicalReport.report)}
        </div>
      </div>
    </div>
  );
};

export default HistoricalReport;
