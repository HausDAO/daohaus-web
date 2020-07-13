import { gql } from 'apollo-boost';

export const GET_MOLOCHES_EXPLORER = gql`
  query moloches($skip: Int) {
    moloches(orderBy: summoningTime, first: 100, skip: $skip) {
      id
      title
      version
      totalShares
      guildBankAddress
      summoningTime
      guildBankBalanceV1
      guildBankValue @client
      apiData @client
      members(where: { exists: true }) {
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
      tokenBalances {
        id
        tokenBalance
        guildBank
        token {
          decimals
          tokenAddress
        }
      }
    }
  }
`;

export const GET_TOKENS = gql`
  query tokens($skip: Int) {
    tokens(first: 100, skip: $skip) {
      tokenAddress
    }
  }
`;

export const GET_MOLOCHES_STATS = gql`
  query moloches($skip: Int) {
    moloches(orderBy: summoningTime, first: 100, skip: $skip) {
      id
      apiData @client
      version
      title
      totalShares
      summoningTime
      guildBankAddress
      guildBankBalanceV1
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
      tokenBalances {
        id
        tokenBalance
        guildBank
        token {
          decimals
          tokenAddress
        }
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
      guildBankBalanceV1
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
      tokenBalances {
        id
        tokenBalance
        guildBank
        token {
          decimals
          tokenAddress
        }
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
        proposals(orderBy: proposalId, orderDirection: desc, first: 10) {
          id
          createdAt
          proposalId
          proposalIndex
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
          molochAddress
          molochVersion
          proposalType @client
          description @client
          title @client
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
          molochAddress
        }
      }
    }
  }
`;
