import { gql } from 'apollo-boost';

// export const GET_MOLOCHES_STATS = gql`
//   query {
//     factories(orderBy: index) {
//       apiDataStats @client
//       title
//       moloch
//       newContract
//       createdAt
//       tokenInfo @client
//       totalShares @client
//       newContractMembers @client
//       newContractProposals @client
//     }
//   }
// `;

export const GET_MOLOCHES = gql`
  query moloches($skip: Int) {
    moloches(orderBy: summoningTime, first: 100, skip: $skip) {
      apiData @client
      tokenInfo @client
      id
      title
      summoner
      version
      totalShares
      members {
        id
      }
      proposals {
        id
      }
      approvedTokens {
        id
      }
    }
  }
`;

export const GET_MOLOCHES_STATS = gql`
  query moloches($skip: Int) {
    moloches(orderBy: summoningTime, first: 100, skip: $skip) {
      totalShares
      summoningTime
      members {
        id
        memberAddress
        createdAt
      }
      proposals {
        id
        createdAt
        votes {
          id
          createdAt
        }
      }
    }
  }
`;

export const GET_MOLOCH = gql`
  query moloch($contractAddr: String!) {
    moloch(id: $contractAddr) {
      apiData @client
      tokenInfo @client
      id
      title
      summoner
      summoningTime
      newContract
      totalShares
      version
      members(where: { exists: true }) {
        id
        delegateKey
        molochAddress
        shares
        memberAddress
      }
      depositToken {
        tokenAddress
      }
    }
  }
`;

export const GET_MEMBERS = gql`
  query members($contractAddr: String!) {
    members(where: { molochAddress: $contractAddr }) {
      id
      delegateKey
      molochAddress
      shares
      memberAddress
    }
  }
`;

export const GET_GASSY = gql`
  query {
    gassiest: badges(first: 10, orderBy: totalGas, orderDirection: desc) {
      memberAddress
      totalGas
    }
  }
`;

export const GET_MEMBER_GAS = gql`
  query badges($memberAddress: String!) {
    badges(where: { memberAddress: $memberAddress }) {
      memberAddress
      totalGas
    }
  }
`;

export const GET_MEMBER_MOLOCHES = gql`
  query members($memberAddress: String!) {
    members(where: { memberAddress: $memberAddress, exists: true }) {
      id
      moloch {
        apiData @client
        tokenInfo @client
        id
        title
        summoner
        version
        totalShares
        members {
          id
        }
        proposals {
          id
        }
        approvedTokens {
          id
        }
      }
    }
  }
`;
