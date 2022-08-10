/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSignatureRequestReport = /* GraphQL */ `
  query GetSignatureRequestReport(
    $rpcSignatureRequest: RPCSignatureRequestInput!
  ) {
    getSignatureRequestReport(rpcSignatureRequest: $rpcSignatureRequest) {
      riskSummary {
        score
        findings {
          type
          message
        }
      }
      requesterContext {
        domain
        safeList
        fraudStatus
        findings {
          type
          message
        }
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
        findings {
          type
          message
        }
        modifiedAssets {
          type
          destination
          asset {
            type
            contract
            tokenId
            amount
          }
        }
      }
      error
    }
  }
`;
