'use client';

import React, { useEffect, useState } from 'react';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string>('');

  // Gestionnaire pour les changements de compte
  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  };

  // Gestionnaire pour les changements de chaîne
  const handleChainChanged = (_chainId: string) => {
    // Recharger la page (ou effectuer d'autres actions nécessaires) pour assurer que les données de la nouvelle chaîne sont chargées
    window.location.reload();
  };

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => handleAccountsChanged(accounts))
        .catch((err: any) => console.error(err));

      // S'abonner aux changements de compte
      ethereum.on('accountsChanged', handleAccountsChanged);

      // S'abonner aux changements de chaîne
      ethereum.on('chainChanged', handleChainChanged);

      // Retourne une fonction de nettoyage qui sera exécutée au démontage du composant
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [account]); // Ré-exécute l'effet si le compte change

  return (
    <div>
      {account ? (
        <p>Wallet Connected: {account}</p>
      ) : (
        <button onClick={() => (window as any).ethereum.request({ method: 'eth_requestAccounts' })}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
