// app/crypto/[id]/page.js (or pages/crypto/[id].js)
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CryptoDetails = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [cryptoData, setCryptoData] = useState(null);
  
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCryptoData(data);
      };

      fetchData();
    }
  }, [id]);

  if (!cryptoData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-300 p-6">
      <h1 className="text-4xl font-bold text-white mb-4">{cryptoData.name}</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Current Price:</h2>
        <p className="text-lg">${cryptoData.market_data.current_price.usd}</p>
        <h2 className="text-xl font-semibold mt-4">Market Cap:</h2>
        <p className="text-lg">${cryptoData.market_data.market_cap.usd}</p>
        <h2 className="text-xl font-semibold mt-4">24h Change:</h2>
        <p className={`text-lg ${cryptoData.market_data.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
          {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CryptoDetails;
