'use client';


/*
Bienvenue Samir dans ton objectif d'aujourd'hui, tu vas créer une page pour afficher les NFTs possédés par une adresse Ethereum.
Tu as creer une page qui contient tout les NFTs possédés par une adresse Ethereum, et un composant qui les affiches.
Tu en es encore a l'étape ou tu as un truc qui a l'air de se tenir, mais rien qui compile ou quoi.
Notamment, au niveau des states et des hooks pour avoir toutes les infos.
Bon courage Samir, tu vas y arriver.

*/
// pages/nfts.tsx
import { useState } from 'react';
import DisplayMyNfts from '../components/DisplayMyNfts';
import { useWallet } from '../context/WalletContext';

const MyNftsPage: React.FC = () => {
	const { account } = useWallet();
  const [ address, setAddress ] = useState<string>(account);

  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchNFTs = async (): Promise<string[]> => {
    try {
      const response = await fetch(`/api/getNFTs?address=${address}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setFetchError(null);
      return data.tokenIds;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setFetchError('Failed to fetch NFTs. Please try again.');
      return [];
    }
  };

  return (
    <div>
      <h1>Check NFTs Owned by an Address</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Ethereum address here"
      />
      <button onClick={() => fetchNFTs()}>Fetch NFTs</button>
      {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      <DisplayMyNfts fetchNFTs={fetchNFTs} />
    </div>
  );
};

export default MyNftsPage;
