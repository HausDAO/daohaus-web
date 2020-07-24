import React from 'react';

import ApplicantItem from './ApplicantItem';
import MemberItem from './MemberItem';

const ApplicationList = props => {
  const { members, daoData, contract } = props;

  const memberList = () => {
    return members.active
      .sort((a, b) => +b.shares - +a.shares)
      .sort((a, b) => {
        return a.memberAddress === daoData.summoner
          ? -1
          : b.memberAddress === daoData.summoner
          ? 1
          : 0;
      })
      .map((member, i) => {
        return (
          <div key={i} className="ApplicationList__Item">
            <MemberItem
              applicant={member}
              applicantAddress={member.memberAddress}
              daoData={daoData}
            />
          </div>
        );
      });
  };

  const newPledgeList = () => {
    return members.applicants.map((pledge, i) => {
      return (
        <div key={i} className="ApplicationList__Item">
          <ApplicantItem
            applicant={pledge}
            daoData={daoData}
            contract={contract}
          />
        </div>
      );
    });
  };

  return (
    <>
      <h3>Members</h3>
      <div className="ApplicationList">{memberList()}</div>
      {+daoData.version !== 2 ? (
        <>
          <h3>Pledges</h3>
          <div className="ApplicationList">{newPledgeList()}</div>
        </>
      ) : null}
    </>
  );
};

export default ApplicationList;
