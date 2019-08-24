import React, { useState, useEffect, Fragment } from "react";
import { get } from "../../util/requests";
import DaoList from '../../components/daoList/DaoList'

const Daos = () => {
  const [daosData, setDaosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/`)
      setDaosData(daoRes.data)
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <h1>DAO Page</h1>
      {daosData.length ? (
        <DaoList daos={daosData} />
      ) : (
        <p>THE HAUS IS LOADING THE DAOS</p>
      )}
    </Fragment>
  );
};

export default Daos;
