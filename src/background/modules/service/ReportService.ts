import {
  SignatureRequestReport,
  RPCSignatureRequestInput,
} from "../../../constants/API";
import MeshedAPI from "./MeshedAPI";

export default class ReportService {
  private meshedApi: MeshedAPI;
  private idToReport: { [key: string]: Promise<SignatureRequestReport> } = {};
  private reports: Promise<SignatureRequestReport>[] = [];

  constructor(meshedApi: MeshedAPI) {
    this.meshedApi = meshedApi;
  }

  public addRequest(
    id: number,
    req: RPCSignatureRequestInput
  ): Promise<SignatureRequestReport> {
    const report = this.meshedApi.generateReport(req);
    this.idToReport[id] = report;
    this.reports.push(report);
    return report;
  }

  public getReport(id: number): Promise<SignatureRequestReport> {
    return this.idToReport[id];
  }
}
