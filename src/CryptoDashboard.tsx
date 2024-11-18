import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarqueeComponent from './components/MarqueeComponent';
import SearchComponent from './components/SearchComponent';
import CoinDetailsCard from './components/CoinDetailsCard'; 
import SnackbarComponent from './components/SnackbarComponent';
import CarouselCards from './components/CarouselCards';

import bgImage from './image/bg.jpg';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  market_cap: number;
  current_price: number;
  total_volume: number;
  rank: number;
  price_change_percentage_24h: number;
  image: string;
  total_supply: number; 
  sparkline_in_7d?: { price: number[] };
  coinHistory: number[]; 
}

const CryptoDashboard: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CryptoData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CryptoData | null>(null);
  const [coinHistory, setCoinHistory] = useState<number[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarLogo, setSnackbarLogo] = useState<string | null>(null);
  const [buyRecommendations, setBuyRecommendations] = useState<CryptoData[]>([]);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0);
  const [gainers, setGainers] = useState<CryptoData[]>([]);
  const [losers, setLosers] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: true,
            },
          }
        );
        setCryptos(response.data);

        const recommendations = response.data.filter(
          (crypto: CryptoData) => crypto.price_change_percentage_24h < -5
        );
        setBuyRecommendations(recommendations);

        const sortedByChange = [...response.data].sort(
          (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        setGainers(sortedByChange.slice(0, 3));
        setLosers(sortedByChange.slice(-3).reverse());

        if (recommendations.length > 0) {
          setSnackbarMessage(`Buy ${recommendations[0].name} now!`);
          setSnackbarLogo(recommendations[0].image);
        }
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (buyRecommendations.length > 0) {
      const interval = setInterval(() => {
        setCurrentRecommendationIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % buyRecommendations.length;
          const nextRecommendation = buyRecommendations[nextIndex];
          setSnackbarMessage(`Buy ${nextRecommendation.name} now!`);
          setSnackbarLogo(nextRecommendation.image);
          return nextIndex;
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [buyRecommendations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredSuggestions = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(query)
    );
    setSuggestions(query ? filteredSuggestions : []);
  };

  const handleSearchSelect = (coin: CryptoData) => {
    setSelectedCoin(coin);
    setSearchQuery('');
    setSuggestions([]);

    if (coin.sparkline_in_7d && coin.sparkline_in_7d.price) {
      setCoinHistory(coin.sparkline_in_7d.price);
    } else {
      setCoinHistory([]);
    }
  };

  const handleCloseCard = () => {
    setSelectedCoin(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage(null);
    setSnackbarLogo(null);
  };

  const getRecommendation = (priceChange: number): string => {
    if (priceChange < -5) {
      return 'Buy';
    } else if (priceChange > 0) {
      return 'Not Buy';
    }
    return 'Hold';
  };

  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute top-4 left-4 z-50 font-web3 text-4xl text-white font-bold">
        CryptoDash 
      </div>

      <div className="absolute top-16 left-4 z-50 font-web3 text-xs text-white">
        © crisander.dev
      </div>

      {snackbarMessage && snackbarLogo && (
        <SnackbarComponent
          message={snackbarMessage}
          logo={snackbarLogo}
          isVisible={!!snackbarMessage}
          onClose={handleCloseSnackbar}
        />
      )}

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
        <SearchComponent
          searchQuery={searchQuery}
          suggestions={suggestions}
          onSearchChange={handleSearchChange}
          onSearchSelect={handleSearchSelect}
        />
      </div>

      <div className="mt-48 w-full flex justify-center">
        <CarouselCards coins={cryptos.slice(0, 10)} />
      </div>

      {selectedCoin && (
        <div className="w-full flex justify-center mt-10">
          <CoinDetailsCard
            selectedCoin={selectedCoin}
            coinHistory={coinHistory}
            onClose={handleCloseCard}
            getRecommendation={getRecommendation}
          />
        </div>
      )}

      <div className="w-full fixed bottom-0">
        <MarqueeComponent cryptos={cryptos} />
      </div>
    </div>
  );
};

export default CryptoDashboard;
