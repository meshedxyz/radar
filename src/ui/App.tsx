import { useState, useEffect, createContext } from "react";
import { getSigReqReport } from "./modules/DataProvider";
import { SignatureRequestReport } from "../constants/API";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Error from "./pages/Error";
import { FetchState, WindowRef } from "../constants/Types";

export const stateContext = createContext<any>(null);

const App = () => {
  const [sigReqReport, setSigReqReport] = useState<SignatureRequestReport>();
  const [reportState, setReportState] = useState(FetchState.Loading);

  useEffect(() => {
    getSigReqReport()
      .then((r) => {
        setSigReqReport(r);
        setReportState(!r || r.error ? FetchState.Failed : FetchState.Loaded);
      })
      .catch(() => {
        setReportState(FetchState.Failed);
      });
  }, []);

  function screen() {
    if (reportState === FetchState.Failed) {
      return <Error error={sigReqReport?.error} />;
    } else if (reportState === FetchState.Loaded) {
      return <Home {...sigReqReport!} />;
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
