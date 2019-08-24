import React, { useState, useEffect } from "react";
import { get } from "../../util/requests";
import DaoList from '../../components/daoList/DaoList'
import SummonButton from "../../components/summonButton/summonButton";


const Home = () => {
  const [daosData, setDaosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/`)
      setDaosData(daoRes.data)
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>DAOHAUS Home</h1>
      <SummonButton/>
      {daosData.length ? (
        <DaoList daos={daosData} />
      ) : (
        <p>THE HAUS IS LOADING THE DAOS</p>
      )}
    </>
  );
};

export default Home;
