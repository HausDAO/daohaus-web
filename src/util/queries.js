import { gql } from 'apollo-boost';

export const GET_MEMBERDATA = gql`
  query members($contractAddr: String!) {
    members(where: { molochAddress: $contractAddr }) {
      id
      delegateKey
      molochAddress
      shares
    }
  }
`;

export const GET_MEMBERDATA_LEGACY = {
    "query": "members { \nid \ndelegateKey \nmolochAddress \nshares \n}"
  };

export const GET_MOLOCHES = gql`
  query {
    factories(orderBy: count) {
      id
      title
      moloch
      summoner
      guildBankValue @client
      approvedToken @client
      apiData @client
    }
  }
`;

export const GET_API_MOLOCHES = gql`
  query {
    apiDaos(first: 5) @client {
      id @client
      name @client
    }
  }
`;
