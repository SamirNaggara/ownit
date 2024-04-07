'use client';

// pages/nfts.tsx
import { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import NFTGallery from '../components/NFTGalery';

const MyNftsPage: React.FC = () => {
	const { account } = useWallet();
	const [tokenIds, setTokenIds] = useState<string[]>([]);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""; 

	useEffect(() => {
		const fetchNFTs = async (): Promise<void> => {
		  if (!account) return; // S'assurer qu'un compte est connecté avant de faire la requête
	
		  try {
			const response = await fetch(`/api/ether_api/get_all_nfts?address=${account}`);
			if (!response.ok) {
			  throw new Error('Failed to fetch');
			}
			const data = await response.json();
			setFetchError(null);
			setTokenIds(data.tokenIds); // Mettre à jour l'état avec les tokenIds récupérés
		  } catch (error) {
			console.error('Error fetching NFTs:', error);
			setFetchError('Failed to fetch NFTs. Please try again.');
		  }
		};
	
		fetchNFTs();
	  }, [account]);

	  if (!account) {
		return (
			<main className="p-24">
				<p className="text-center text-xl">You need to connect your wallet to see your NFT&apos;s</p>
			</main>
		)
	}

	  return (
    <div>
      {account ? (
        <>
          <h1>Your NFTs: {account}</h1>
          {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
          {/* Afficher NFTGallery uniquement si tokenIds contient des éléments */}
          {tokenIds.length > 0 && <NFTGallery tokenIds={tokenIds} />}
        </>
      ) : (
        <div>Connect your wallet</div>
      )}
    </div>
  );
};

export default MyNftsPage;
