// import NextPage generic type

import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { SignatureRequestReport } from "../../constants/API";

import ReportNav from "../components/ReportNav";
import Details from "../components/Details";
import Notify from "../components/Notify";
import Summary from "../components/Summary";

const Report = (props: {
  reports: SignatureRequestReport[];
  current: number;
  setCurrent: { (n: number): void };
}) => {
  const report = props.reports[props.current];
  return (
    <div className="w-full h-[592px] bg-gradient-to-t from-black via-black to-slate-900  shadow-gray-900/50 rounded-b-xl border-[0.25px] border-slate-700 overflow-y-visible">
      <Router>
        <ReportNav {...props} />
        <Routes>
          <Route path="/" element={<Summary {...report} />} />
          <Route path="details" element={<Details {...report} />} />
          <Route path="notify" element={<Notify {...report} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Report;
