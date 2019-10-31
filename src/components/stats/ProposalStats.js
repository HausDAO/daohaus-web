import React from 'react';

import '../../views/stats/Stats.scss';

const ProposalStats = props => {
  const { data } = props;

  const totalProposals = () => {
    const counts = data.factories.reduce(
      (sum, dao) => {
        +dao.newContract
          ? (sum.new += dao.newContractProposals.length)
          : (sum.legacy += dao.apiDataStats.legacyData.proposals.length);
        return sum;
      },
      { new: 0, legacy: 0 },
    );

    return counts.new + counts.legacy;
  };

  const totalVotes = () => {
    //loop each proposal too
    // const counts = data.factories.reduce(
    //   (sum, dao) => {
    //     +dao.newContract
    //       ? (sum.new += dao.newContractProposals.votes.length)
    //       : (sum.legacy += dao.apiDataStats.legacyData.proposals.votes.length);
    //     return sum;
    //   },
    //   { new: 0, legacy: 0 },
    // );
    // return counts.new + counts.legacy;
  };
  return (
    <>
      <div className="Stat_overview">
        <div className="Stat_group">
          <p className="Stat__title">Total Proposals</p>
          <p className="Stat__value">{totalProposals()}</p>
        </div>
        <div className="Stat_group">
          <p className="Stat__title">Total Votes</p>
          <p className="Stat__value">{totalVotes()}</p>
        </div>
      </div>
    </>
  );
};

export default ProposalStats;
