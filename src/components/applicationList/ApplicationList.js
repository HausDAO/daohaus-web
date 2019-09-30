import React from 'react';

import './ApplicationList.scss';

import ApplicantItem from '../applicantItem/ApplicantItem';
import MemberItem from '../memberItem/MemberItem';

const ApplicationList = props => {
  const { applications, daoData, contract, contractData, data } = props;

  const memberList = () => {
    console.log('query data', data);
    if ('members' in data) {
      return data.members
        .sort(function(a, b) {
          return b.shares - a.shares;
        })
        .sort(function(x, y) {
          return x.id.split('-')[1].toLowerCase() ===
            daoData.summonerAddress.toLowerCase()
            ? -1
            : y.id.split('-')[1].toLowerCase() ===
              daoData.summonerAddress.toLowerCase()
            ? 1
            : 0;
        })
        .map((member, i) => {
          return (
            <div key={i} className="ApplicationList__Item">
              <MemberItem
                applicant={member}
                daoData={daoData}
                contract={contract}
                contractData={contractData}
              />
            </div>
          );
        });
    } else {
      return [];
    }
  };

  const newPledgeList = () => {
    console.log('applications', applications);
    if (
      !applications ||
      (Object.entries(applications).length === 0 &&
        applications.constructor === Object)
    ) {
      return [];
    }

    return applications
      .map((member, i) => {
        // remove members
        if (JSON.stringify(data).indexOf(member.applicantAddress) === -1) {
          return (
            <div key={i} className="ApplicationList__Item">
              <ApplicantItem
                applicant={member}
                daoData={daoData}
                contract={contract}
                contractData={contractData}
              />
            </div>
          );
        } else {
          return null;
        }
      })
      .filter(member => member !== undefined);
  };

  return (
    <>
      {data && applications && <>{newPledgeList()}</>}
      <>{memberList()}</>
      )}
    </>
  );
};

export default ApplicationList;
