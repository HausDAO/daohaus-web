import { gql } from 'apollo-boost';

export const GET_MEMBERDATA = gql`
  query members($contractAddr: String!) {
    members(where: { molochAddress: $contractAddr }) {
      id
      delegateKey
      molochAddress
      shares
      memberId @client
    }
  }
`;

export const GET_MEMBERDATA_LEGACY = {
  query: 'query members { members { id delegateKey shares }}',
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

export const GET_MOLOCH = gql`
  query factories($contractAddr: String!) {
    factories(where: { id: $contractAddr }) {
      id
      title
      moloch
      summoner
      newContract
      guildBankValue @client
      approvedToken @client
      totalShares @client
      apiData @client
    }
  }
`;

export const GET_API_MOLOCHES = gql`
  query ApiDao {
    apiDaos @client {
      id @client
      name @client
    }
  }
`;
