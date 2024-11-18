import React from 'react';

interface MarqueeProps {
  cryptos: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    price_change_percentage_24h: number;
  }[];
}

const MarqueeComponent: React.FC<MarqueeProps> = ({ cryptos }) => {
  return (
    <div className="w-full overflow-hidden mb-10 bg-gray-800/40 backdrop-blur-lg rounded-lg shadow-lg">
      <div className="flex animate-marquee whitespace-nowrap">
        {cryptos.map((crypto) => (
          <span key={crypto.id} className="mx-4 inline-flex items-center text-white text-lg">
            <img src={crypto.image} alt={`${crypto.name} logo`} className="w-6 h-6 mr-2" />
            {crypto.name} ({crypto.symbol.toUpperCase()}) 
            <span className={`ml-2 font-bold ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ({crypto.price_change_percentage_24h.toFixed(2)}%)
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeComponent;
