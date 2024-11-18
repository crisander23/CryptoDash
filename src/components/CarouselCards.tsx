import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselCard from './CarouselCard';

interface CarouselCardsProps {
  coins: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    total_supply: number;
  }[];
}

const CarouselCards: React.FC<CarouselCardsProps> = ({ coins }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full px-4 py-6">
      {coins.length > 0 ? (
        <Slider {...settings}>
          {coins.map((coin) => (
            <div key={coin.id} className="px-2">
              <CarouselCard coin={coin} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-400">
          No cryptocurrency data available.
        </div>
      )}
    </div>
  );
};

export default CarouselCards;
