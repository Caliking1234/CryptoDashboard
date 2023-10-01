import axios from "axios";

export const getCoinData = async (coin) => {
  try {
    let res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const getChartData = async (coin, currency) => {
  try {
    let res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=30`
    );
    return res;
  } catch (error) {
    return error;
  }
};
