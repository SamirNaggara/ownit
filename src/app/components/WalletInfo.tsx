'use client';

// Un composant dans ton application
import React from 'react';
import { useWallet } from '../context/WalletContext'; // Ajuste le chemin selon ta structure

const WalletInfo: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
	<div>
			{account ? (
			<p>Wallet Connected: {account}</p>
			) : (
			<p>No account connected</p>
			)}
  	</div>
  );
};

export default WalletInfo;
