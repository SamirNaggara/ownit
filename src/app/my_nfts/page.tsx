'use client';

// pages/nfts.tsx
import { useState } from 'react';
import DisplayMyNfts from '../components/DisplayMyNfts';
import { useWallet } from '../context/WalletContext';

const MyNftsPage: React.FC = () => {
	const { account } = useWallet();

	const [fetchError, setFetchError] = useState<string | null>(null);

	const fetchNFTs = async (): Promise<string[]> => {
		try {
			console.log(account)
			const response = await fetch(`/api/ether_api/get_all_nfts?address=${account}`);
			if (!response.ok) {
				throw new Error('Failed to fetch');
			}
			const data = await response.json();
			setFetchError(null);
			console.log('NFTs:', data.tokenIds)
			return data.tokenIds;
		} catch (error) {
			console.error('Error fetching NFTs:', error);
			setFetchError('Failed to fetch NFTs. Please try again.');
			return [];
		}
  	};

	  return (
		<div>
		  {account ? (
			<>
			  <h1>Your NFTs: {account}</h1>
			  <button onClick={() => fetchNFTs()}>Fetch NFTs</button>
			  {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
			  {/* <DisplayMyNfts fetchNFTs={fetchNFTs} /> */}
			</>
		  ) : (
			<div>Connect your wallet</div>
		  )}
		</div>
	  );
};

export default MyNftsPage;
