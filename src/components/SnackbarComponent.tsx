import React, { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  logo: string; // URL for the coin logo
  isVisible: boolean;
  onClose: () => void;
}

const SnackbarComponent: React.FC<SnackbarProps> = ({ message, logo, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-transform transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } bg-green-400/30 backdrop-blur-md text-white px-6 py-4 rounded-lg shadow-lg border border-green-400/50`}
      style={{ transition: 'all 0.3s ease-in-out' }}
    >
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Coin logo"
          className="w-8 h-8 rounded-full border border-white shadow-md"
        />
        <span className="font-semibold text-white">{message}</span>
      </div>
    </div>
  );
};

export default SnackbarComponent;
