import React, { useContext } from 'react';
import { useQuery } from 'react-apollo';

import { GET_FEATURED_DAOS } from '../../util/queries';
import { ExploreContext } from '../../contexts/ExploreContext';
import { featuredCommunities } from '../../content/home-content';
import { Link } from 'react-router-dom';

const FeaturedDaos = () => {
  const { state } = useContext(ExploreContext);

  const { loading, error, data } = useQuery(GET_FEATURED_DAOS, {
    fetchPolicy: 'network-only',
    context: { prices: state.prices },
    variables: {
      featured1: featuredCommunities[0].address,
      featured2: featuredCommunities[1].address,
      featured3: featuredCommunities[2].address,
      featured4: featuredCommunities[3].address,
      featured5: featuredCommunities[4].address,
    },
  });

  if (loading) return <p className="View">Loading Featured DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  return (
    <>
      <div className="FeaturedCommunities">
        {featuredCommunities.map((communityData, i) => {
          const community = { ...communityData, ...data[`featured${i + 1}`] };
          return (
            <div key={community.name} className="FeaturedCommunity">
              <h4>{community.name}</h4>
              <p>{community.sub}</p>
              <p>
                $
                {community.guildBankValue
                  ? community.guildBankValue.usd.toFixed(2)
                  : 0}{' '}
                | {community.members ? community.members.length : 0} Members
              </p>
              {community.version ? (
                <Link to={`/dao/v${community.version}/${community.address}`}>
                  <div
                    className="FeaturedCommunity__Avatar"
                    style={{ backgroundImage: 'url(' + community.image + ')' }}
                  >
                    <span>&nbsp;</span>
                  </div>
                </Link>
              ) : (
                <div
                  className="FeaturedCommunity__Avatar"
                  style={{ backgroundImage: 'url(' + community.image + ')' }}
                >
                  <span>&nbsp;</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeaturedDaos;
