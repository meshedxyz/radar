import { getSignatureRequestReport } from "../../../constants/queries";
import { createFraudReport } from "../../../constants/mutations";
import awsExports from "../../../../aws-exports";
import {
  RPCSignatureRequest,
  SignatureRequestReport,
  SignatureRequestReportInput,
} from "../../../constants/API";
import { parseDomain, ParseResultType } from "parse-domain";

export default class MeshedAPI {
  public async submitFraudReport(
    report: SignatureRequestReport,
    message: string
  ) {
    const reportInput: SignatureRequestReportInput = {
      ...report,
      addressContexts: JSON.stringify(report.addressContexts),
    } as SignatureRequestReportInput;

    reportInput.actionContext.data = JSON.stringify(report.actionContext.data);

    return this.fetchGraphQL(createFraudReport, {
      input: { message: message, report: reportInput },
    }).catch((e) =>
      console.error(`Error submitting report: ${JSON.stringify(e)}`)
    );
  }

  public async generateReport(
    req: RPCSignatureRequest
  ): Promise<SignatureRequestReport> {
    return this.fetchGraphQL(getSignatureRequestReport, {
      rpcSignatureRequest: { ...req, params: JSON.stringify(req.params) },
    }).then((obj) => {
      return {
        ...obj.getSignatureRequestReport,
        addressContexts: obj.getSignatureRequestReport?.addressContexts
          ? JSON.parse(obj.getSignatureRequestReport.addressContexts)
          : null,
      };
    });
  }

  public getDomainFromURL(resource: string): string {
    try {
      const domain = new URL(resource).hostname
        .replace("www.", "")
        .replace("https://", "");
      const parseResult = parseDomain(domain);
      if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = parseResult;
        return `${domain}.${topLevelDomains.join(".")}`.toLowerCase();
      } else {
        return domain;
      }
    } catch (e) {
      return resource;
    }
  }

  /**
   * This method calls the GraphQL API.
   * @param { query } query This is the query, mutation or subscription that has to be called for in GraphQL
   * @throws {UnauthenticatedError} When the authentication to AWS fails.
   */
  private async fetchGraphQL(query: any, variables?: any): Promise<any> {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": awsExports.api_key,
      },

      body: JSON.stringify({ query: query, variables: variables }),
    };

    const url = awsExports.api_endpoint;

    return fetch(url, opts)
      .then((res) => res.json())
      .then((obj) => obj.data);
  }
}
