import clsx from "clsx";

import { RiskScore, SignatureRequestReport } from "../../constants/API";

import Icons from "./Icons";

const Analysis = (sigReqReport: SignatureRequestReport) => {
  const { riskSummary } = sigReqReport;

  const riskTranslation = clsx(
    { "Low Risk": riskSummary?.score === RiskScore.Low },
    { "High Risk": riskSummary?.score === RiskScore.High },
    { Trusted: riskSummary?.score === RiskScore.Trusted },
    { "Use Caution": riskSummary?.score === RiskScore.Unknown },
    { "No Risk": riskSummary?.score === RiskScore.None },
    { "Active Scam": riskSummary?.score === RiskScore.Scam }
  );

  const riskColor = clsx(
    { "text-red-500": riskSummary?.score === RiskScore.High },
    { "text-green-500": riskSummary?.score === RiskScore.Low },
    { "text-purple-500": riskSummary?.score === RiskScore.Trusted },
    { "text-orange-500": riskSummary?.score === RiskScore.Unknown },
    { "text-blue-500": riskSummary?.score === RiskScore.None },
    { "text-red-600": riskSummary?.score === RiskScore.Scam }
  );

  const riskFindings =
    riskSummary?.findings?.map((item: any, index: any) => {
      return (
        <li className="w-full" key={index}>
          <a className="flex py-2 justify-center">
            <p
              className="flex font-body place-items-center text-slate-500"
              title={item.message}
            >
              <Icons id={item.type} classDetails={"w-4 h-4 shrink-0 mx-1.5"} />
              {item.message}
            </p>
          </a>
        </li>
      );
    }) || [];

  return (
    <div className="w-full">
      <div className="flex justify-center font-bold text-3xl text-slate-50 tracking-wide">
        Analysis: <a className={"px-1 " + riskColor}> {riskTranslation} </a>
      </div>
      <div className="flex justify-center">
        <ul className="w-full mb-3 text-gray-600 text-xs font-display">
          <div className="flex justify-center">
            {riskFindings.length ? (
              <div className="w-full py-0.5 mx-3">{riskFindings}</div>
            ) : (
              <></>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Analysis;
