'use client';

// Un composant dans ton application
import React from 'react';
import { useWallet } from '../context/WalletContext'; // Ajuste le chemin selon ta structure

const WalletButton: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      {account ? (
        <>
          <button onClick={disconnectWallet} className='text-black'>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={connectWallet} className='text-black'>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletButton;
