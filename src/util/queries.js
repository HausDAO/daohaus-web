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

export const GET_MOLOCHES_POST = {
  query: `query {
    factories(orderBy: index) {
      id
    }
  }`,
};

export const GET_MOLOCHES_POST_V2 = {
  query: `query {
    daos(orderBy: index) {
      id
    }
  }`,
};

export const GET_MOLOCHES = gql`
  query factories($skip: Int) {
    factories(orderBy: index, first: 100, skip: $skip) {
      apiData @client
      id
      title
      moloch
      summoner
      tokenInfo @client
    }
  }
`;

export const GET_MOLOCHES_V2 = gql`
  query daos($skip: Int) {
    daos(orderBy: index, first: 100, skip: $skip) {
      apiData @client
      id
      index
      moloch
      summoner
      version
      title
    }
    moloches(orderBy: summoningTime, first: 100, skip: $skip) {
      id
      totalShares
      summoningTime
      members(where: { exists: true }) {
        id
      }
    }
  }
`;

export const GET_MOLOCH = gql`
  query factories($contractAddr: String!) {
    factories(where: { id: $contractAddr }) {
      apiData @client
      id
      title
      moloch
      summoner
      newContract
      tokenInfo @client
      totalShares @client
    }
  }
`;

export const GET_MOLOCH_V2 = gql`
  query daos($contractAddr: String!) {
    daos(where: { id: $contractAddr }) {
      apiData @client
      id
      title
      moloch
      summoner
      version
    }
    moloches(where: { id: $contractAddr }) {
      id
      totalShares
      summoningTime
      members(where: { exists: true }) {
        id
        memberAddress
        delegateKey
        shares
        loot
      }
      depositToken {
        tokenAddress
      }
    }
  }
`;

export const GET_MOLOCHES_STATS = gql`
  query {
    factories(orderBy: index) {
      apiDataStats @client
      title
      moloch
      newContract
      createdAt
      tokenInfo @client
      totalShares @client
      newContractMembers @client
      newContractProposals @client
    }
  }
`;

export const GET_PROPOSALS = gql`
  query proposals($contractAddr: String!) {
    proposals(where: { molochAddress: $contractAddr }) {
      id
      timestamp
      molochAddress
      votes {
        id
      }
    }
  }
`;

export const GET_PROPOSALS_LEGACY = {
  query: 'query proposals { proposals { id, timestamp, votes { id } }}',
};
