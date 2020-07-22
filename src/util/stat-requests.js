import axios from 'axios';

export const BaseUrl = () => {
  return process.env.REACT_APP_STATGRAPH_URL;
};

export const getBalances = async (daoAddress, tokenAddress) => {
  const baseURL = BaseUrl();

  const payload = {
    query: `{balances(where: {molochAddress: "${daoAddress}"} orderBy: timestamp, orderDirection: desc, first: 100) {timestamp balance}}`,
  };

  // const payload = {
  //   query: `{balances(where: {molochAddress: "${daoAddress}", tokenAddress: "${tokenAddress}"} orderBy: timestamp, orderDirection: desc, first: 100) {timestamp balance}}`,
  // };

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    return await instance.post(``, payload);
  } catch (err) {
    return err.response;
  }
};

// {
//   balances(first: 20,
//     orderBy: timestamp,
//     orderDirection: desc,
//   where:{molochAddress: "0x0372f3696fa7dc99801f435fd6737e57818239f2"}) {
//     timestamp
//     balance
//   }
// }
