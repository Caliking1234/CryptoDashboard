"use client";
import { getChartData, getCoinData } from "@/utils/api";
import "apexcharts/dist/apexcharts.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import ReactApexChart from "react-apexcharts";
import Image from "next/image";
import img from "../../public/assets/7152289.jpg";
export default function Home() {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false, // Prevents server-side rendering
  });
  const [coin, setCoin] = useState("bitcoin");
  const [currency, setCurrency] = useState("inr");
  const [MarketCap24hr, setMarketCap24hr] = useState("");
  const [MarketCap, setMarketCap] = useState("");
  const [High24Hrs, setHigh24Hrs] = useState("");
  const [Low24Hrs, setLow24Hrs] = useState("");
  const [UpVotes, setUpVotes] = useState("");
  const [prices, setprices] = useState([]);
  const [market_cap, setmarket_cap] = useState([]);
  const [total_vol, settotal_vol] = useState([]);
  const [name, setname] = useState("");
  const [ath, setath] = useState("");
  const [atl, setatl] = useState("");
  const [curentprice, setcurrentprice] = useState("");
  const [priceChange, setpriceChange] = useState("");
  const [TotalVolume, setTotalVolume] = useState("");
  const [CirculatingSupply, setCirulatingSupply] = useState("");

  useEffect(() => {
    const CoinData = async (coin) => {
      let res = await getCoinData(coin);
      console.log(res);
      setname(res?.data?.name);
      setath(res?.data?.market_data?.ath[currency]);
      setatl(res?.data?.market_data?.atl[currency]);
      setcurrentprice(res?.data?.market_data?.current_price[currency]);
      setHigh24Hrs(res?.data?.market_data?.high_24h[currency]);
      setLow24Hrs(res?.data?.market_data?.low_24h[currency]);
      setUpVotes(res?.data?.sentiment_votes_up_percentage);
      setMarketCap24hr(res?.data?.market_data?.market_cap_change_24h);
      setMarketCap(res?.data?.market_data?.market_cap[currency]);
      setTotalVolume(res?.data?.market_data?.total_volume[currency]);
      setCirulatingSupply(res?.data?.market_data?.total_supply);
      setpriceChange(
        res?.data?.market_data?.price_change_24h_in_currency[currency]
      );
    };

    const ChartData = async (coin, currency) => {
      let res = await getChartData(coin, currency);
      setprices(res?.data?.prices);
      setmarket_cap(res?.data?.market_caps);
      settotal_vol(res?.data?.total_volumes);
      console.log(res);
    };

    CoinData(coin);
    ChartData(coin, currency);
  }, [coin, currency]);

  const options = {
    chart: {
      id: "basic-line",
      responsive: true,
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Market Cap",
      style: {
        color: "#B2B92C",
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return value.toFixed(3);
        },
      },
      theme: "dark",
      style: {
        background: "#333",
        color: "#fff",
      },
    },
  };
  const options2 = {
    chart: {
      id: "basic-line",
      responsive: true,
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Total Market Volume",
      style: {
        color: "#D25FC6",
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return value.toFixed(3);
        },
      },
      theme: "dark",
      style: {
        background: "#333",
        color: "#fff",
      },
    },
  };
  const options3 = {
    chart: {
      id: "basic-line",
      responsive: true,
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      show: false,
    },
    title: {
      text: "Market Prices",
      style: {
        color: "#06FDFE",
        y: {
          formatter: (value) => {
            return value.toFixed(3);
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return value.toFixed(3);
        },
      },
      theme: "dark",
      style: {
        background: "#333",
        color: "#fff",
      },
    },
  };

  const series = [
    {
      name: "Market Cap",
      data: market_cap,
      type: "line",
      color: "#B2B92C",
    },
  ];
  const series2 = [
    {
      name: "Total Volume",
      data: total_vol,
      type: "line",
      color: "#D25FC6",
    },
  ];
  const series3 = [
    {
      name: "Market Prices",
      data: prices,
      type: "area",
      color: "#06FDFE",
      fill: {
        colors: ["#FF5733"],
      },
    },
  ];
  return (
    <main
      style={{ backgroundImage: `url('/7152289.jpg')` }}
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat tracking-widest"
    >
      <div className=" w-full bg-blue-300 px-5 py-3 flex items-center justify-between">
        <div className=" flex flex-row gap-3">
          <div className="flex gap-2">
            <select
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose Coin</option>
              <option value="avalanche-2" className=" tracking-widest">
                Avalanche (AVAX)
              </option>
              <option value="binancecoin" className=" tracking-widest">
                Binance (BNB)
              </option>
              <option value="bitcoin" className=" tracking-widest">
                Bitcoin (BTC)
              </option>
              <option value="cardano" className=" tracking-widest">
                Cardano (ADA)
              </option>
              <option value="decentraland" className=" tracking-widest">
                Decentraland (MANA)
              </option>
              <option value="dogecoin" className=" tracking-widest">
                Dogecoin (DOGE)
              </option>
              <option value="ethereum" className=" tracking-widest">
                Ethereum (ETH)
              </option>
              <option value="ripple" className=" tracking-widest">
                Ripple (XRP)
              </option>
              <option value="solana" className=" tracking-widest">
                Solana (SOL)
              </option>
              <option value="tether" className=" tracking-widest">
                Tether (USDT)
              </option>
            </select>
          </div>
          <div className="flex gap-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose Coin</option>
              <option value="inr">INR</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>

        <div>
          <h1 className=" text-white font-bold text-3xl uppercase tracking-widest drop-shadow-sm">
            Crypto Dashboard
          </h1>
        </div>
      </div>
      <div className=" w-full h-full p-10 relative">
        <div className=" w-full h-full absolute inset-0">
          <Image
            src={img}
            height={1000}
            width={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" z-10">
          <div className="z-10">
            <h1 className=" text-white font-bold text-3xl uppercase tracking-widest drop-shadow-sm">
              {name}
            </h1>
          </div>
          <div className=" py-8 gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full items-center z-10">
            <div className="w-[150px] h-[100px] mx-auto bg-[#2C2B2C] rounded-sm flex gap-2 flex-col items-center justify-center px-1 text-white text-xs border-white border-[1px] shadow-sm shadow-black z-10">
              <div>Mraket Cap 24Hr:</div>
              <div className=" text-blue-300">{MarketCap24hr}%</div>
            </div>
            <div className="w-[150px] h-[100px] mx-auto bg-[#2C2B2C] rounded-sm flex gap-2 flex-col items-center justify-center px-1 text-white text-xs border-white border-[1px] shadow-sm shadow-black z-10">
              <div>All Time High</div>
              <div className=" text-green-500">{ath}</div>
            </div>
            <div className="w-[150px] h-[100px] mx-auto bg-[#2C2B2C] rounded-sm flex gap-2 flex-col items-center justify-center px-1 text-white text-xs border-white border-[1px] shadow-sm shadow-black z-10">
              <div>All Time Low</div>
              <div className=" text-red-500">{atl}</div>
            </div>
            <div className="w-[150px] h-[100px] mx-auto bg-[#2C2B2C] rounded-sm flex gap-2 flex-col items-center justify-center px-1 text-white text-xs border-white border-[1px] shadow-sm shadow-black z-10">
              <div>Market Upvotes:</div>
              <div className=" text-blue-300">{UpVotes}%</div>
            </div>
            <div className="w-[150px] h-[100px] mx-auto bg-[#2C2B2C] rounded-sm flex gap-2 flex-col items-center justify-center px-1 text-white text-xs border-white border-[1px] shadow-sm shadow-black z-10">
              <div>24Hr High:</div>
              <div className=" text-green-500">{High24Hrs}</div>
            </div>
            <div className="w-[150px] h-[100px] mx-auto bg-[#2C2B2C] rounded-sm flex gap-2 flex-col items-center justify-center px-1 text-white text-xs border-white border-[1px] shadow-sm shadow-black z-10">
              <div>24Hr Low:</div>
              <div className=" text-red-500">{Low24Hrs}</div>
            </div>
          </div>
          <div className=" w-full flex flex-col items-center justify-center gap-3 z-10">
            <h1 className=" text-white text-lg uppercase tracking-widest drop-shadow-sm z-10">
              Current Price
            </h1>
            <div className=" text-blue-400 font-extrabold text-5xl flex flex-row gap-1 z-10">
              {curentprice}
              {currency == "inr" ? (
                <div className=" z-10 text-white">INR</div>
              ) : (
                <div className=" z-10 text-white">USD</div>
              )}
            </div>
          </div>
          <div className=" w-full h-full flex flex-col md:flex-row gap-2 items-center justify-around py-8 z-10">
            <div className=" h-full z-10">
              <ReactApexChart options={options3} series={series3} width={500} />
            </div>
            <div className="px-2 mx-auto w-full flex flex-row md:flex-col gap-5 items-center justify-center z-10">
              <div className=" w-full flex gap-2 flex-col items-center justify-center px-1 text-white text-xs z-10">
                <div>Mraket Cap:</div>
                <div className=" text-blue-300 font-extrabold">{MarketCap}</div>
              </div>
              <div className=" w-full flex gap-2 flex-col items-center justify-center px-1 text-white text-xs z-10">
                <div>Price Change 24hr</div>
                <div className=" text-blue-300 font-extrabold  flex flex-row gap-1">
                  {priceChange}
                  {currency == "inr" ? (
                    <div className=" text-white">INR</div>
                  ) : (
                    <div className=" text-white">USD</div>
                  )}
                </div>
              </div>
              <div className=" w-full flex gap-2 flex-col items-center justify-center px-1 text-white text-xs z-10">
                <div>Total Volume</div>
                <div className=" text-blue-300 font-extrabold">
                  {TotalVolume}
                </div>
              </div>
              <div className=" w-full flex gap-2 flex-col items-center justify-center px-1 text-white text-xs z-10">
                <div>Current Supply:</div>
                <div className=" text-blue-300 font-extrabold">
                  {CirculatingSupply}
                </div>
              </div>
            </div>
            <div className=" flexflex-col w-full h-full items-center justify-between">
              <div className=" h-1/2">
                <ReactApexChart options={options} series={series} width={300} />
              </div>
              <div className=" h-1/2">
                <ReactApexChart
                  options={options2}
                  series={series2}
                  width={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
