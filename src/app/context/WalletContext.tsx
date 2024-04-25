'use client';

// WalletContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface IWalletContext {
  account: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<IWalletContext | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string>('');



  const connectWallet = async () => {

    if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
		const currentUrl = window.location.href;
		window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    // Plus d'actions pour "déconnecter" l'utilisateur peuvent être ajoutées ici
  };

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
