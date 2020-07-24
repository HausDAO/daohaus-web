import React from 'react';
import { Helmet } from 'react-helmet';

const HeadTags = props => {
  const { daoData } = props;

  return (
    <Helmet>
      <title>{`Daohaus - ${daoData.apiData.name}`}</title>
    </Helmet>
  );
};

export default HeadTags;
