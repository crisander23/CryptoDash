import React from 'react';
import { Line } from 'react-chartjs-2';

interface CarouselCardProps {
  coin: {
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_supply: number;
  };
}

const getRecommendation = (priceChange: number): string => {
  if (priceChange < -5) {
    return 'Buy'; // Recommendation to buy if price drops significantly
  }
  return 'Hold'; // Recommendation to hold otherwise
};

const CarouselCard: React.FC<CarouselCardProps> = ({ coin }) => {
  const recommendation = getRecommendation(coin.price_change_percentage_24h);

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        data: [coin.current_price, coin.current_price + 10, coin.current_price - 5, coin.current_price + 15, coin.current_price],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
        },
        title: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
        },
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-lg rounded-lg shadow-xl p-6 w-full relative border border-gray-500/30 hover:scale-105 transform transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={coin.image}
            alt={`${coin.name} logo`}
            className="w-14 h-14 rounded-full border-2 border-gray-600"
          />
          <h2 className="text-2xl text-white font-semibold">
            {coin.symbol.toUpperCase()}
          </h2>
        </div>

        <div className="text-sm font-bold">
          <span
            className={`${
              recommendation === 'Buy' ? 'text-green-400' : 'text-yellow-400'
            }`}
          >
            {recommendation}
          </span>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-400">Current Price</p>
        <p className="text-2xl font-bold text-white">
          ${coin.current_price.toLocaleString()}
        </p>
        <p
          className={`text-sm mt-2 font-bold ${
            coin.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {coin.price_change_percentage_24h >= 0 ? '+' : ''}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6 text-sm text-gray-300">
        <div>
          <p className="font-semibold">Market Cap</p>
          <p className="font-semibold">${coin.market_cap.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Total Supply</p>
          <p className="font-semibold">{coin.total_supply.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CarouselCard;
