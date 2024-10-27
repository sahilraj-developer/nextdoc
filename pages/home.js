import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bitcoinData, setBitcoinData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch Bitcoin data on component mount
  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true');
        const data = await response.json();
        setBitcoinData(data);
        setLoadingData(false);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  if (status === 'loading') {
    return <p className="text-center">Loading...</p>; // Show loading state while session is being fetched
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-4 flex justify-between items-center shadow-md transition-all duration-300">
        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition duration-200 shadow-lg"
        >
          Logout
        </button>
      </header>
      <main className="flex-grow p-8 text-center">
  <h2 className="text-3xl font-bold mb-6">Current Bitcoin Price</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl relative">
      <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-bl-lg">
        BTC
      </div>
      <h3 className="text-xl font-semibold mb-2">Bitcoin (BTC)</h3>
      {loadingData ? (
        <p className="text-gray-500">Loading Bitcoin data...</p>
      ) : (
        <>
          <p className="text-4xl font-bold text-green-600 mb-2">
            $ {bitcoinData?.bitcoin?.usd.toLocaleString()}
          </p>
          <p className="text-gray-500">
            24h Change: 
            <span className={bitcoinData?.bitcoin?.usd_24h_change >= 0 ? 'text-green-500' : 'text-red-500'}>
              {bitcoinData?.bitcoin?.usd_24h_change.toFixed(2)}%
            </span>
          </p>
          <p className="text-gray-500">
            Last updated: {new Date(bitcoinData?.bitcoin?.last_updated_at * 1000).toLocaleString()}
          </p>
        </>
      )}
    </div>

    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl relative">
      <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-bl-lg">
        Market Cap
      </div>
      <h3 className="text-xl font-semibold mb-2">Bitcoin Market Cap</h3>
      {loadingData ? (
        <p className="text-gray-500">Loading market cap...</p>
      ) : (
        <p className="text-4xl font-bold text-blue-600 mb-2">
          $ {Number(bitcoinData?.bitcoin?.usd) * 18000000} {/* Approximation for market cap */}
        </p>
      )}
    </div>

    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl relative">
      <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-bl-lg">
        Volume
      </div>
      <h3 className="text-xl font-semibold mb-2">Bitcoin Volume (24h)</h3>
      {loadingData ? (
        <p className="text-gray-500">Loading volume...</p>
      ) : (
        <p className="text-4xl font-bold text-yellow-500 mb-2">
          $ {Math.random() * 2000000000} {/* Randomized for demonstration */}
        </p>
      )}
    </div>
  </div>
</main>

      <footer className="p-4 bg-gray-200 text-center">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
