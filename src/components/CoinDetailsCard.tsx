import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CoinDetailsProps {
  selectedCoin: {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    market_cap: number;
    current_price: number;
    total_volume: number;
    price_change_percentage_24h: number;
    image: string;
  } | null;
  coinHistory: number[];
  onClose: () => void;
  getRecommendation: (priceChange: number) => string;
}

const CoinDetailsCard: React.FC<CoinDetailsProps> = ({
  selectedCoin,
  coinHistory,
  onClose,
  getRecommendation,
}) => {
  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<any>(null);

  const recommendation = getRecommendation(selectedCoin?.price_change_percentage_24h || 0);
  const recommendationColor = recommendation === 'Buy' ? 'text-green-400' : 'text-red-400';

  useEffect(() => {
    const createGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
      if (chartArea) {
        const gradientFill = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradientFill.addColorStop(0, 'rgba(39, 233, 255, 0.4)');
        gradientFill.addColorStop(1, 'rgba(39, 233, 255, 0.1)');
        setGradient(gradientFill);
      }
    };

    if (chartRef.current && chartRef.current.chartInstance) {
      const chart = chartRef.current.chartInstance;
      const chartArea = chart.chartArea;
      createGradient(chart.ctx, chartArea);
    }
  }, [coinHistory]);

  if (!selectedCoin) return null;

  const gradientBackground = (ctx: any) => {
    if (!gradient) return;
    return gradient;
  };

  const maxPrice = Math.max(...coinHistory);
  const minPrice = Math.min(...coinHistory);
  const priceRange = maxPrice - minPrice;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900/40 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-96 relative border border-gray-600/30">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl hover:text-red-400"
        >
          &times;
        </button>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={selectedCoin.image}
              alt={`${selectedCoin.name} logo`}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <h2 className="text-2xl text-white font-semibold">
              {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
            </h2>
          </div>
          <p className={`text-xl font-semibold ${recommendationColor}`}>
            {recommendation}
          </p>
        </div>
        <div className="text-gray-300 space-y-3">
          <p className="flex justify-between">
            <span className="font-medium text-white">Rank:</span>
            <span className="text-white">{selectedCoin.rank}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-white">Market Cap:</span>
            <span className="text-white">${selectedCoin.market_cap.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-white">24h Volume:</span>
            <span className="text-white">${selectedCoin.total_volume.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-white">Price:</span>
            <span className="text-white">${selectedCoin.current_price.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-white">24h Change:</span>
            <span className={`font-bold ${selectedCoin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {selectedCoin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
        </div>
        <div className="mt-6 bg-transparent p-4 rounded-lg shadow-lg">
          <Line
            ref={chartRef}
            key={selectedCoin.id}
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
              datasets: [
                {
                  data: coinHistory.slice(-5),
                  borderColor: 'rgba(39, 233, 255, 1)',
                  backgroundColor: gradientBackground,
                  pointBackgroundColor: 'rgba(39, 233, 255, 1)',
                  pointBorderColor: 'rgba(39, 233, 255, 1)',
                  pointBorderWidth: 3,
                  pointRadius: 6,
                  tension: 0.4,
                  fill: true,
                  hoverBackgroundColor: 'rgba(39, 233, 255, 0.6)',
                },
              ],
            }}
            options={{
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
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    color: '#ffffff',
                    stepSize: Math.ceil(priceRange / 5),
                  },
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDetailsCard;
