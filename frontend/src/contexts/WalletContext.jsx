import React, { createContext, useState, useContext } from 'react';

// Create wallet context
const WalletContext = createContext();

// Custom hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

// Provider component
export const WalletProvider = ({ children }) => {
  const [walletState, setWalletState] = useState({
    connected: false,
    address: null,
    balance: null,
    network: null,
    achievements: []
  });

  // Connect wallet function (mock implementation)
  const connectWallet = async () => {
    try {
      // In a real implementation, this would interact with MetaMask
      // For now, just simulate a successful connection
      setWalletState({
        connected: true,
        address: '0x' + Array(40).fill(0).map(() => 
          Math.floor(Math.random() * 16).toString(16)
        ).join(''),
        balance: '0.05',
        network: 'Monad Testnet',
        achievements: []
      });
      
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return false;
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletState({
      connected: false,
      address: null,
      balance: null,
      network: null,
      achievements: []
    });
  };

  // Record achievement on-chain (mock implementation)
  const recordAchievement = async (achievement) => {
    // In a real implementation, this would create a transaction
    // For now, just add to local state
    setWalletState(prev => ({
      ...prev,
      achievements: [...prev.achievements, {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        timestamp: new Date().toISOString(),
        txHash: '0x' + Array(64).fill(0).map(() => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('')
      }]
    }));
    
    return true;
  };

  // Check if wallet is on the correct network
  const checkNetwork = () => {
    // Mock implementation
    return walletState.network === 'Monad Testnet';
  };

  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Value object with state and functions
  const value = {
    ...walletState,
    connectWallet,
    disconnectWallet,
    recordAchievement,
    checkNetwork,
    formatAddress
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;