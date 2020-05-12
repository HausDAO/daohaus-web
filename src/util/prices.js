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

  const eth = await instance.get(`/ethereum`);
  console.log('eth', eth);

  // const dai = await instance.get(`/dai`);
  // coincap now returns 404 on /dai
  // return { weth: eth.data.data.priceUsd, dai: dai.data.data.priceUsd };

  return { weth: eth.data.data.priceUsd, dai: '1.0' };

  // } catch (err) {
  //   throw new Error(err);
  // }
};

export const getEthPrice = async () => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  const eth = await instance.get(`/ethereum`);
  return eth.data.data.priceUsd;
  // } catch (err) {
  //   throw new Error(err);
  // }
};
