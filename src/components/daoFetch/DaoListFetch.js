import React, { useState, useContext } from 'react';
import { useQuery } from 'react-apollo';

import { MolochV2Context } from '../../contexts/ContractContexts';
import { GET_MOLOCHES, GET_MOLOCHES_V2 } from '../../util/queries';
import DaoFilter from '../daoFilter/DaoFilter';
import DaoList from '../daoList/DaoList';

const DaoListFetch = ({ version }) => {
  const [MolochV2] = useContext(MolochV2Context);
  const [filteredDaos, setFilteredDaos] = useState();

  const query = version === '1' ? GET_MOLOCHES : GET_MOLOCHES_V2;
  const options = version === '1' ? {} : { client: MolochV2.client };
  const entityName = version === '1' ? 'factories' : 'molochV2S';
  const { loading, error, data, fetchMore } = useQuery(query, options);

  if (loading) return <p className="View">Loading DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  fetchMore({
    variables: { skip: data[entityName].length },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return;
      return Object.assign({}, prev, {
        factories: [...prev[entityName], ...fetchMoreResult[entityName]],
      });
    },
  });

  return (
    <>
      <div className="Search">
        {data ? (
          <DaoFilter
            daos={data[entityName]}
            setFilteredDaos={setFilteredDaos}
          />
        ) : null}
      </div>
      <div className="Block Primary Home__Daolist">
        {filteredDaos ? <DaoList daos={filteredDaos} /> : null}
      </div>
    </>
  );
};

export default DaoListFetch;
