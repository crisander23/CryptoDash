import React from 'react';

interface SearchProps {
  searchQuery: string;
  suggestions: {
    id: string;
    name: string;
    symbol: string;
    image: string;
  }[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSelect: (coin: any) => void;
}

const SearchComponent: React.FC<SearchProps> = ({
  searchQuery,
  suggestions,
  onSearchChange,
  onSearchSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 relative">
      <div className="flex items-center space-x-4 bg-gray-800/30 backdrop-blur-lg rounded-full p-3 shadow-lg border border-gray-500/20">
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search coin..."
          className="w-72 px-4 py-2 bg-transparent text-white placeholder-white focus:outline-none"
        />
        <button className="bg-gray-800/30 backdrop-blur-lg text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-all duration-300">
          🔍
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-20 w-80 bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-lg border border-gray-500/20 max-h-48 overflow-y-auto z-50">
          {suggestions.map((crypto) => (
            <li
              key={crypto.id}
              onClick={() => onSearchSelect(crypto)}
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <img src={crypto.image} alt={`${crypto.name} logo`} className="w-5 h-5" />
                <span>{crypto.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
