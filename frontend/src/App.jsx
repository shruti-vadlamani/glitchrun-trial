import React, { useState } from 'react';
import Game from './components/Game';
import WalletConnect from './components/WalletConnect';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    // For now, just set as connected without real wallet integration
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!walletConnected ? (
        <WalletConnect onConnect={handleWalletConnect} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;