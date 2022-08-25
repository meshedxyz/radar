import { useState, useEffect, createContext } from "react";
import { addReportListener, getInitialReport } from "./modules/DataProvider";

import { SignatureRequestReport } from "../constants/API";
import Report from "./pages/Report";
import Loading from "./pages/Loading";
import Error from "./pages/Error";
import { FetchState, WindowRef } from "../constants/Types";

export const stateContext = createContext<any>(null);

const App = () => {
  const [sigReqReports, setReports] = useState<SignatureRequestReport[]>([]);
  const [currentReportIndex, setCurrentReportIndex] = useState<number>(0);
  const [reportState, setReportState] = useState(FetchState.Loading);

  useEffect(() => {
    const failure = () => {
      setReportState(FetchState.Failed);
    };
    const success = (r: SignatureRequestReport) => {
      setReports((prev) => {
        const updated = [...prev, r];
        setCurrentReportIndex(updated.length - 1);
        return updated;
      });
      setReportState(!r || r.error ? FetchState.Failed : FetchState.Loaded);
    };
    addReportListener(success, failure);
    getInitialReport();
  }, []);

  function setReportIndex(n: number) {
    if (n >= 0 && n < sigReqReports.length) {
      setCurrentReportIndex(n);
    }
  }

  function screen() {
    if (reportState === FetchState.Failed) {
      return <Error error={sigReqReports[currentReportIndex]?.error} />;
    } else if (reportState === FetchState.Loaded) {
      return (
        <Report
          reports={sigReqReports}
          current={currentReportIndex}
          setCurrent={setReportIndex}
        />
      );
    } else if (reportState === FetchState.Loading) {
      return <Loading />;
    }
  }

  return (
    <div className="bg-gradient-to-tr from-black to-slate-900 h-screen">
      <main className="flex justify-center" id={WindowRef.body}>
        <div className="flex flex-wrap w-full sm:w-[377px] h-full">
          {screen()}
        </div>
      </main>
    </div>
  );
};

export default App;
