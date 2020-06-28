import Web3 from 'web3';

import Web3Service from '../util/web3Service';
import MolochService from './molochService';

import TokenService from './tokenService';
import { get } from './requests';
import { titleMaker, descriptionMaker } from './helpers';

let _web3;
if (
  Web3.givenProvider &&
  Web3.givenProvider.networkVersion === process.env.REACT_APP_NETWORK_ID
) {
  _web3 = new Web3(Web3.givenProvider);
} else {
  _web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI),
  );
}
const web3Service = new Web3Service(_web3);

export const resolvers = (() => {
  const tokens = {};
  const molochs = {};
  return {
    Moloch: {
      apiData: async (moloch, _args) => {
        let apiData = [];
        try {
          const daoRes = await get(`moloch/${moloch.id}`);
          apiData = daoRes.data;
        } catch (e) {
          console.log('error on dao api call', e);
        }

        return apiData;
      },
      guildBankValue: async (moloch, _args, _context) => {
        let molochService;
        if (moloch.version === '1') {
          if (molochs.hasOwnProperty(moloch.id)) {
            molochService = molochs[moloch.id];
          } else {
            molochs[moloch.id] = new MolochService(moloch.id, web3Service);
            molochService = molochs[moloch.id];
          }

          const guildBankAddr = await molochService.getGuildBankAddr();
          let tokenService;
          if (tokens.hasOwnProperty(moloch.depositToken.tokenAddress)) {
            tokenService = tokens[moloch.depositToken.tokenAddress];
          } else {
            tokens[moloch.depositToken.tokenAddress] = new TokenService(
              moloch.depositToken.tokenAddress,
              web3Service,
            );
            tokenService = tokens[moloch.depositToken.tokenAddress];
          }

          let guildBankValue;
          try {
            const daoRes = await get(`moloch/${moloch.id}`);
            if (daoRes.data.hide) {
              throw new Error({ err: 'token error' });
            }
            guildBankValue = await tokenService.balanceOf(guildBankAddr);
          } catch (err) {
            // console.log('symbol or guildbank error', err);
            guildBankValue = '0';
          }

          return guildBankValue;
        } else {
          return null;
        }
      },
    },
    Proposal: {
      unread: proposal => {
        const abortedOrCancelled = proposal.aborted || proposal.cancelled;
        const now = (new Date() / 1000) | 0;
        const inVotingPeriod =
          now >= +proposal.votingPeriodStart &&
          now <= +proposal.votingPeriodEnds;
        const needsMemberVote = inVotingPeriod && !proposal.votes.length;
        const needsProcessing =
          now >= +proposal.gracePeriodEnds && !proposal.processed;

        return (
          !abortedOrCancelled &&
          (needsMemberVote || needsProcessing || !proposal.sponsored)
        );
      },
      proposalType: proposal => {
        let type;
        if (proposal.molochVersion === '1') {
          type = 'V1 Proposal';
        } else if (proposal.newMember) {
          return 'Member Proposal';
        } else if (proposal.whitelist) {
          return 'Whitelist Token Proposal';
        } else if (proposal.guildkick) {
          return 'Guildkick Proposal';
        } else if (proposal.trade) {
          return 'Trade Proposal';
        } else {
          return 'Funding Proposal';
        }

        return type;
      },
      title: proposal => {
        return titleMaker(proposal);
      },
      description: proposal => {
        return descriptionMaker(proposal);
      },
    },
  };
})();
