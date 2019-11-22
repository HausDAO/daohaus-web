export const formatTotalUsd = (value, prices) => {
  return (value.dai * prices.dai + value.weth * prices.weth).toLocaleString(
    undefined,
    { maximumFractionDigits: 2 },
  );
};

export const toUsd = (approvedToken, value, prices) => {
  // return (value * prices[approvedToken]).toLocaleString(undefined, {
  //   maximumFractionDigits: 2,
  // });

  return (value * prices[approvedToken]).toFixed(2);
};
