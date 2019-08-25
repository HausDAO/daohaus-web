import React, { useState, useEffect } from "react";
import { get } from "../../util/requests";
import DaoList from "../../components/daoList/DaoList";
import SummonButton from "../../components/summonButton/summonButton";
import { useWeb3Context } from "web3-react";
import "./Home.scss";

const Home = () => {
  const [daosData, setDaosData] = useState([]);
  const context = useWeb3Context();

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/`);
      setDaosData(daoRes.data.reverse());
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="Hero">
        <h1>Explore the Haus of Moloch</h1>
        <h3>
          Discover and Pledge to existing Moloch DAOs, or summon your own.
        </h3>
        {context.active && !context.error && <SummonButton />}
      </div>
      <div className="daoList">
        {daosData.length ? (
          <DaoList daos={daosData} />
        ) : (
          <p>THE HAUS IS LOADING THE DAOS</p>
        )}
      </div>
    </>
  );
};

export default Home;
