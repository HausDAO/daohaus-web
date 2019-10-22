import axios from 'axios';

const baseURL = 'https://api.coincap.io/v2/assets';

export const getPriceUsd = async id => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.get(`/${id}`);
  } catch (err) {
    throw new Error(err);
  }
};

export const getPrices = async () => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    const eth = await instance.get(`/ethereum`);
    const dai = await instance.get(`/dai`);
    return { Weth: eth.data.data.priceUsd, Dai: dai.data.data.priceUsd };
  } catch (err) {
    throw new Error(err);
  }
};
