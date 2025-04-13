import React from 'react';

function WalletConnect({ onConnect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="p-8 bg-gray-900 rounded-lg shadow-2xl border border-purple-500 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">
          GlitchRun
        </h1>
        <p className="text-xl mb-8 text-center text-gray-300">
          Connect your wallet to enter the Cyber Arena
        </p>
        <div className="space-y-4">
          <button
            onClick={onConnect}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-md shadow-lg hover:from-purple-700 hover:to-cyan-600 transition duration-300 flex items-center justify-center"
          >
            <span className="mr-2">Connect Wallet</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">
            Powered by Monad & Groq AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default WalletConnect;