import React, { useEffect, useState } from 'react';
import makeBlockie from 'ethereum-blockies-base64';

import './ProfileMemberList.scss';

const ProfileMemberList = ({ daos }) => {
  const [visibleDaos, setVisibleDaos] = useState([]);

  useEffect(() => {
    const firstDaos = [...daos];

    setVisibleDaos(firstDaos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDaoAvatar = dao => {
    const recentRages = dao.rageQuits.filter(rage => {
      // 1209600000 === 2 weeks
      const now = (new Date() / 1000) | 0;
      return +rage.createdAt >= now - 1209600;
    });
    const recentProposals = dao.proposals.filter(prop => {
      return prop.unread;
    });
    const healthCount = recentRages.length + recentProposals.length;

    return (
      <div key={dao.id} className="Daolist__Item">
        <a
          href={`${process.env.REACT_APP_POKEMOL_URL}/dao/${dao.id}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div
            className="Daolist__Avatar"
            style={{
              backgroundImage: `url("${makeBlockie(dao.id)}")`,
            }}
          >
            {healthCount ? (
              <span className="NoteCount">{healthCount}</span>
            ) : null}
            <p className="Daolist__Avatar--Initial">{dao.title.substr(0, 1)}</p>
          </div>
          <p className="Daolist__Item--Title">{dao.title}</p>
        </a>
      </div>
    );
  };

  const handleChange = event => {
    if (event.target.value) {
      const resultDaos = daos.filter(dao => {
        return (
          dao.title.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        );
      });
      setVisibleDaos(resultDaos);
    } else {
      setVisibleDaos(daos);
    }
  };

  const canSearch = daos.length > 5;

  return (
    <div className="ProfileMemberList">
      <div className="Row">
        <h4>Member of {daos.length} DAOs</h4>

        {canSearch ? (
          <div className="DaoFilter__search">
            <input
              type="search"
              className="input"
              placeholder="Search Daos"
              onChange={e => handleChange(e)}
            />
          </div>
        ) : null}
      </div>

      <div className="Daolist">
        {visibleDaos.map(dao => renderDaoAvatar(dao))}
      </div>
    </div>
  );
};

export default ProfileMemberList;
