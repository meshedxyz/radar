/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFraudReport = /* GraphQL */ `
  mutation CreateFraudReport(
    $input: CreateFraudReportInput!
    $condition: ModelFraudReportConditionInput
  ) {
    createFraudReport(input: $input, condition: $condition) {
      message
      report {
        riskSummary {
          score
        }
        requesterContext {
          domain
          safeList
          fraudStatus
          method
        }
        addressContexts
        actionContext {
          functionName
          type
          from
          to
          chainId
          data
        }
      }
      id
      createdAt
      updatedAt
    }
  }
`;
