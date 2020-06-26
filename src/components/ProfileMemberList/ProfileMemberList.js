import React, { useEffect, useState } from 'react';

import './ProfileMemberList.scss';

const ProfileMemberList = ({ daos }) => {
  const [visibleDaos, setVisibleDaos] = useState([]);

  useEffect(() => {
    const firstDaos = [...daos].slice(0, 5);
    setVisibleDaos(firstDaos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDaoAvatar = dao => {
    const recentRages = dao.rageQuits.filter(rage => {
      // 1209600000 === 2 weeks
      return +rage.createdAt >= Date.now() - 1209600000;
    });
    const healthCount = recentRages.length + dao.proposals.length;
    return (
      <div key={dao.id}>
        <a
          href={`${process.env.REACT_APP_POKEMOL_URL}/dao/${dao.id}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className="Daolist__avatar">
            {healthCount ? <span>{healthCount}</span> : null}
            <p>{dao.title.substr(0, 1)}</p>
          </div>
          <p>{dao.title}</p>
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
      setVisibleDaos(resultDaos.slice(0, 4));
    } else {
      setVisibleDaos([...daos].slice(0, 4));
    }
  };

  const canSearch = daos.length > visibleDaos.length;

  return (
    <div className="ProfileMemberList">
      <div className="Row">
        <h2>Member of {daos.length} DAOs</h2>

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
