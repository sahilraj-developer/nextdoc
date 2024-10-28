"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CryptoPage() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [cryptoList, setCryptoList] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [news, setNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
const fetchCryptoData = async () => {
  try {
    // Fetch cryptocurrency list (adjust as needed to get more than 10)
    const cryptoResponse = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    const cryptoData = await cryptoResponse.json();
    setCryptoList(cryptoData);

    // Filter top gainers (change percentage > 0)
    const gainers = cryptoData.filter((coin) => coin.price_change_percentage_24h > 0);
    const losers = cryptoData.filter((coin) => coin.price_change_percentage_24h < 0);

    // Sort and set top gainers and losers
    setTopGainers(gainers.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 10));
    setTopLosers(losers.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 10));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};


    fetchCryptoData();
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.clear()
    router.push("/login"); // Redirect to logout page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-300 flex flex-col items-center p-6">
      
      <header className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Crypto Tracker</h1>
        <button
          className="bg-white text-blue-600 py-2 px-4 rounded-lg shadow hover:bg-blue-200 transition duration-300 transform hover:scale-105"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </header>
  
      {/* Trending Coins Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <section className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">🔥</span> Trending Coins
          </h2>
          <ul>
            {trendingCoins.map((coin) => (
              <li key={coin.item.id} className="flex justify-between py-2 border-b border-gray-300">
                <span>{coin.item.symbol.toUpperCase()}</span>
                <span className="text-blue-600">${coin.item.price_btc.toFixed(8)} BTC</span>
              </li>
            ))}
          </ul>
        </section>
  
        {/* Market Overview Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 flex items-center">📊 Market Overview</h2>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-600">Market Cap</p>
              <p className="text-green-500 text-lg">${marketData.total_market_cap?.usd?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">24h Volume</p>
              <p className="text-green-500 text-lg">${marketData.total_volume?.usd?.toLocaleString()}</p>
            </div>
          </div>
        </section>
  
        {/* News Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 flex items-center">📰 Latest News</h2>
          <ul>
            {news.slice(0, 5).map((item) => (
              <li key={item.id} className="py-2 border-b border-gray-300">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
  
      {/* Top Gainers and Losers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mt-8">
        <section className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">📈 Top Gainers</h2>
          <ul>
            {topGainers.map((coin) => (
              <li key={coin.id} className="flex justify-between py-2 border-b border-gray-300">
               <Link href={`/crypto/${coin.id}`} className="text-blue-600 hover:underline">
  {coin.name}
</Link>
                <span className="text-green-500">${coin.current_price.toLocaleString()}</span>
                <span className="text-green-500">{coin.price_change_percentage_24h.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </section>
  
        <section className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">📉 Top Losers</h2>
          <ul>
            {topLosers.map((coin) => (
              <li key={coin.id} className="flex justify-between py-2 border-b border-gray-300">
                <span>{coin.name}</span>
                <span className="text-red-500">${coin.current_price.toLocaleString()}</span>
                <span className="text-red-500">{coin.price_change_percentage_24h.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
  
      {/* Crypto Table Section */}
      <div className="w-full max-w-6xl bg-white p-4 mt-8 rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">1h %</th>
              <th className="py-2">24h %</th>
            </tr>
          </thead>
          <tbody>
            {cryptoList.map((coin, index) => (
              <tr key={coin.id} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{coin.name}</td>
                <td className="py-2">${coin.current_price.toLocaleString()}</td>
                <td className={`py-2 ${coin.price_change_percentage_1h_in_currency >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                </td>
                <td className={`py-2 ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
