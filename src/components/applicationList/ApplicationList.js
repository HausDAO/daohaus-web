import React from 'react';

import './ApplicationList.scss';

import ApplicantItem from '../applicantItem/ApplicantItem';
import MemberItem from '../memberItem/MemberItem';

const ApplicationList = props => {
  const { members, daoData, contract } = props;

  const memberList = () => {
    return members.active
      .sort((a, b) => b.shares - a.shares)
      .sort((a, b) => {
        let idField = +daoData.newContract ? 'memberId' : 'id';
        return a[idField] === daoData.summoner
          ? -1
          : b[idField] === daoData.summoner
          ? 1
          : 0;
      })
      .map((member, i) => {
        let applicantAddress = +daoData.newContract
          ? member['memberId']
          : member['id'];
        return (
          <div key={i} className="ApplicationList__Item">
            <MemberItem
              applicant={member}
              applicantAddress={applicantAddress}
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
      <h3>Pledges</h3>
      <div className="ApplicationList">{newPledgeList()}</div>
    </>
  );
};

export default ApplicationList;
