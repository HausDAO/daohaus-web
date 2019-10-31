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

export const GET_MOLOCHES_STATS = gql`
  query {
    factories(orderBy: count) {
      title
      moloch
      newContract
      guildBankValue @client
      approvedToken @client
      totalShares @client
      apiDataStats @client
      newContractMembers @client
      newContractProposals @client
    }
  }
`;

export const GET_PROPOSALS = gql`
  query proposals($contractAddr: String!) {
    proposals(where: { molochAddress: $contractAddr }) {
      id
      votes {
        id
      }
    }
  }
`;

export const GET_PROPOSALS_LEGACY = {
  query: 'query proposals { proposals { id, votes { id } }}',
};
