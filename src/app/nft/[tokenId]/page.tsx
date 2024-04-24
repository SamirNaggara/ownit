'use client';

// pages/nft/[tokenId].tsx
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSetProductState } from '@/app/context/useContract';
import { isMobile } from 'react-device-detect';
import ToggleProductStateButton from '@/app/components/ToggleProductStateButton';
// This function detects most providers injected at window.ethereum.

interface NFTMetadata {
  name: string;
  description: string;
  image: string; // URL de l'image
}

export default function NFTPage({ params }: { params: { tokenId: string } }) {
	const [nftMetadata, setNFTMetadata] = useState<any | null>(null);
	const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""; // Adresse de ton contrat déployé
	const [error, setError] = useState<string | null>(null);
	const { setProductState } = useSetProductState();
	const [productStateValue, setProductStateValue] = useState<number>(-1);

	const [chargement, setChargement] = useState(false);

	const changeProductState = async (etat: number) => {

		setChargement(true);
	
		try {
		  // Appel à votre fonction asynchrone pour déclarer l'état, avec une simulation
		  if (etat !== 0 && etat !== 1 && etat !== 2) {throw new Error('État invalide')}
		  await setProductState(params.tokenId, etat);
		  
		  // Définir le message de succès basé sur l'état
		} catch (error) {
		  console.error(error);
		} finally {
		  setChargement(false);
		}
	  };

	
	
	

	useEffect(() => {
		const fetchNFTs = async () => {
			if (!params.tokenId || typeof params.tokenId !== 'string') return;
			try {
			  const response = await fetch(`/api/ether_api/get_nft_metadata?contractAddress=${contractAddress}&tokenId=${params.tokenId}`);
			  if (!response.ok) {
				throw new Error(`Erreur lors de la récupération des métadonnées pour le tokenId ${params.tokenId}: ${response.statusText}`);
			  }
			  const data = await response.json();
			  setProductStateValue(data?.productState)
			  setNFTMetadata(data)
			} catch (error) {
			  setError('Une erreur est survenue lors de la récupération des métadonnées des NFTs.');
			  return null; // Retourner null pour les cas d'erreur, puis filtrer plus tard
			}
	
		  // Filtrer les éventuelles valeurs null dues aux erreurs
		};
	
		fetchNFTs();
	  }, []);

	if (!nftMetadata) {
		return <div>Loading...</div>;
	}

	const productStateDescriptions: { [key: number]: string } = {
		0: "This item is authentic",
		1: "This item is stolen",
	  };
	  
	  function describeProductState(state: number): string {
		return productStateDescriptions[state] || "État du produit inconnu.";
	  }
	  

	  const handleChangeProductState = (newState: number) => {
		changeProductState(newState)
	  }
			 
	
  return (
      <div className="bg-grey shadow-xl rounded-lg max-w-xl mx-auto pt-12">
        <div className="relative w-full">
			<Image src={nftMetadata?.imagePinata} alt={nftMetadata.metadata.name} width={1000} height={1000} className='w-[80%] mx-auto rounded-3xl'/>
        </div>
        <div className="p-8 bg-white mt-12 rounded-3xl w-[80%] mx-auto">
          <h1 className="text-center text-2xl font-bold text-black">{nftMetadata.metadata.name}</h1>
          <p className="text-center mt-1 text-black">{nftMetadata.metadata.description}</p>
		  <hr className='border-grey border-[1.5px] mt-4 mx-2'/>
		  <p className='text-center mt-4 text-black'>Item Status - 
		  
		  { nftMetadata?.productState == 0 ? (<span className='font-bold text-green-700'> Legit</span>): (<span className='font-bold text-red-700'> Stolen</span>) }
		  </p>
			<p className='text-center mt-4 text-black'>{describeProductState(nftMetadata?.productState)}</p>
        </div>
		<div>

			<ToggleProductStateButton
				productStateValue={productStateValue}
				handleChangeProductState={handleChangeProductState}
			/>
			

		</div>
		<div className='p-8 bg-white mt-6 rounded-3xl w-[80%] mx-auto'>
			<p  className="mb-2 text-black" title={contractAddress}>Contract address: {contractAddress.substring(0, 20)}...</p>
			<p className="mb-2 text-black" title={params.tokenId}>Token id: {params.tokenId.substring(0, 20)}...</p>
			<p className="mb-2 text-black">Token chain: {process.env.NEXT_PUBLIC_ETHEREUM_NETWORK}</p>
		
		</div>
    </div>
  );
}

