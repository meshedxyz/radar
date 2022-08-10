// import NextPage generic type

import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { SignatureRequestReport } from "../../constants/API";

import Nav from "../components/Nav";
import Details from "../components/Details";
import Report from "../components/Report";
import Summary from "../components/Summary";

const Home = (signatureRequestReport: SignatureRequestReport) => {
  return (
    <div className="w-full h-[592px] bg-gradient-to-t from-black via-black to-slate-900  shadow-gray-900/50 rounded-b-xl border-[0.25px] border-slate-700 overflow-y-visible">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Summary {...signatureRequestReport} />} />
          <Route
            path="details"
            element={<Details {...signatureRequestReport} />}
          />
          <Route
            path="report"
            element={<Report {...signatureRequestReport} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default Home;
