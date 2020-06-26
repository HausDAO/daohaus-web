import { gql } from 'apollo-boost';

export const GET_MOLOCHES = gql`
  query moloches($skip: Int) {
    moloches(orderBy: summoningTime, first: 100, skip: $skip) {
      apiData @client
      guildBankValue @client
      id
      title
      summoner
      version
      totalShares
      guildBankAddress
      members {
        id
      }
      proposals {
        id
      }
      approvedTokens {
        id
      }
      depositToken {
        tokenAddress
        symbol
        decimals
      }
    }
  }
`;

export const GET_MOLOCHES_STATS = gql`
  query moloches($skip: Int) {
    moloches(orderBy: summoningTime, first: 100, skip: $skip) {
      id
      apiData @client
      guildBankValue @client
      version
      title
      totalShares
      summoningTime
      guildBankAddress
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
      depositToken {
        tokenAddress
        symbol
        decimals
      }
    }
  }
`;

export const GET_MOLOCH = gql`
  query moloch($contractAddr: String!) {
    moloch(id: $contractAddr) {
      apiData @client
      guildBankValue @client
      id
      title
      summoner
      summoningTime
      newContract
      totalShares
      guildBankAddress
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
        symbol
        decimals
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
      memberAddress
      moloch {
        id
        title
        version
        proposals(orderBy: proposalId, orderDirection: desc, first: 20) {
          id
          createdAt
          proposalId
          processed
          sponsored
          details
          newMember
          whitelist
          guildkick
          trade
          cancelled
          aborted
          votingPeriodStarts
          votingPeriodEnds
          gracePeriodEnds
          unread @client
          votes(where: { memberAddress: $memberAddress }) {
            id
            memberAddress
          }
        }
        rageQuits {
          id
          createdAt
          shares
          loot
          memberAddress
        }
      }
    }
  }
`;
