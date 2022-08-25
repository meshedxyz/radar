// import NextPage generic type
import { SignatureRequestReport } from "../../constants/API";
import DetailsRequester from "./DetailsRequester";
import { useEffect } from "react";

import Footer from "./Footer";
import DetailOutcome from "./DetailsOutcome";
import { getAddressContexts, updateWindow } from "./UIHelper";
import { WindowRef } from "../../constants/Types";

const Details = (sigRequestReport: SignatureRequestReport) => {
  useEffect(() => {
    updateWindow(WindowRef.root);
  });

  return (
    <>
      <div className="flex flex-col h-[440px] relative justify-start">
        <div className="h-full overflow-y-auto py-2">
          <div className="flex justify-center w-full flex-wrap space-y-2">
            <h1 className="font-semibold text-base text-slate-600">
              Signature Details
            </h1>
            <DetailsRequester {...sigRequestReport} />
            <DetailOutcome {...sigRequestReport} />
            {getAddressContexts(sigRequestReport)}
          </div>
        </div>
      </div>
      <Footer {...sigRequestReport} />
    </>
  );
};

export default Details;
