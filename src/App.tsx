import React from 'react';
import CryptoDashboard from './CryptoDashboard';
import bgImage from './image/bg.jpg'; // Adjust the import path to your file location

const App: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }} // Use the imported image here
    >
      <CryptoDashboard />
    </div>
  );
};

export default App;
