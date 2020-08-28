import { get } from './requests';
import { titleMaker, descriptionMaker } from './helpers';
import { getBalances } from './stat-requests';

export const resolvers = (() => {
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
        if (moloch.version === '1') {
          const usdPrice = _context.prices[
            moloch.depositToken.tokenAddress
          ] || {
            usd: 0,
          };
          const usdValue =
            usdPrice.usd *
            (moloch.guildBankBalanceV1 / 10 ** moloch.depositToken.decimals);
          return { token: moloch.guildBankBalanceV1, usd: usdValue };
        } else {
          const guilBankBalances = moloch.tokenBalances.filter(
            bal => bal.guildBank,
          );

          const totalValue = guilBankBalances.reduce((sum, bal) => {
            const usdPrice = _context.prices[bal.token.tokenAddress] || {
              usd: 0,
            };

            const usdValue =
              usdPrice.usd * (+bal.tokenBalance / 10 ** +bal.token.decimals);
            return sum + usdValue;
          }, 0);

          return { token: 0, usd: totalValue };
        }
      },
      balances: async (moloch, _args, _context) => {
        const balances = await getBalances(moloch.id);

        return balances.data.data.balances.map(b => {
          return +(+b.balance / 10 ** 19).toFixed(0);
        });
      },
    },
    Proposal: {
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
      activityFeed: proposal => {
        const abortedOrCancelled = proposal.aborted || proposal.cancelled;
        const now = (new Date() / 1000) | 0;
        const inVotingPeriod =
          now >= +proposal.votingPeriodStart &&
          now <= +proposal.votingPeriodEnds;
        const needsMemberVote = inVotingPeriod && !proposal.votes.length;
        const needsProcessing =
          now >= +proposal.gracePeriodEnds && !proposal.processed;

        let message;
        if (!proposal.sponsored) {
          message = 'New and unsponsored';
        }
        if (needsProcessing) {
          message = 'Unprocessed';
        }
        if (needsMemberVote) {
          message = "You haven't voted on this";
        }

        return {
          unread:
            !abortedOrCancelled &&
            (needsMemberVote || needsProcessing || !proposal.sponsored),
          message,
        };
      },
    },
  };
})();
