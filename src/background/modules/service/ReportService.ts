import { nanoid } from "nanoid";
import {
  RPCSignatureRequestInput,
  TrustListStatus,
  RiskScore,
  SignatureRequestReport,
} from "../../../constants/API";
import { REPORT_HISTORY_PAGE_SIZE } from "../../../constants/Types";
import MeshedAPI from "./MeshedAPI";
import StorageService from "./StorageService";

export default class ReportService {
  private meshedApi: MeshedAPI;
  private currentReports: Map<string, Promise<SignatureRequestReport>> =
    new Map();
  private storage: StorageService;

  constructor(meshedApi: MeshedAPI, storage: StorageService) {
    this.meshedApi = meshedApi;
    this.storage = storage;
  }

  public addRequest(req: RPCSignatureRequestInput) {
    const reportKey = nanoid();
    this.currentReports.set(
      reportKey,
      this.meshedApi.generateReport(req).then(async (report) => {
        return this.storage
          .getTrustListStatus(report?.requesterContext?.domain)
          .then((val) => {
            if (val === TrustListStatus.Trusted) {
              report.riskSummary.score =
                report?.riskSummary?.score === RiskScore.Scam
                  ? report?.riskSummary?.score
                  : RiskScore.Trusted;
            }
            this.storage.addReportHistory(reportKey, req, report);
            return report;
          });
      })
    );
    return reportKey;
  }

  public async getReport(key: string) {
    if (this.currentReports.has(key)) {
      return this.currentReports.get(key);
    }
    return this.storage.getReport(key).then((r) => {
      return r.report;
    });
  }

  public getHistoricalReports(start: number) {
    return this.storage.getReportHistory(start, REPORT_HISTORY_PAGE_SIZE);
  }
}
