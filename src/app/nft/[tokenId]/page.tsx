'use client';

// pages/nft/[tokenId].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useContract, useGetProductState, useSetProductState } from '@/app/context/useContract';

interface NFTMetadata {
  name: string;
  description: string;
  image: string; // URL de l'image
}

export default function NFTPage({ params }: { params: { tokenId: string } }) {
	const [nftMetadata, setNFTMetadata] = useState<any | null>(null);
	const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""; // Adresse de ton contrat déployé
	const [error, setError] = useState<string | null>(null);
	const { getProductState } = useGetProductState();
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

		const handleProductState = async () => {
			setProductStateValue(await getProductState(params.tokenId));
		}
		handleProductState()
	
	
	

	useEffect(() => {
		const fetchNFTs = async () => {
			if (!params.tokenId || typeof params.tokenId !== 'string') return;
			try {
			  const response = await fetch(`/api/ether_api/get_nft_metadata?contractAddress=${contractAddress}&tokenId=${params.tokenId}`);
			  if (!response.ok) {
				throw new Error(`Erreur lors de la récupération des métadonnées pour le tokenId ${params.tokenId}: ${response.statusText}`);
			  }
			  const data = await response.json();

			  setNFTMetadata(data)
			} catch (error) {
			  setError('Une erreur est survenue lors de la récupération des métadonnées des NFTs.');
			  return null; // Retourner null pour les cas d'erreur, puis filtrer plus tard
			}
	
		  // Filtrer les éventuelles valeurs null dues aux erreurs
		};
	
		fetchNFTs();
	  }, [params.tokenId, contractAddress, getProductState]);

	if (!nftMetadata) {
		return <div>Loading...</div>;
	}

	const productStateDescriptions: { [key: number]: string } = {
		0: "Ce produit est légitime.",
		1: "Attention : Ce produit est signalé comme volé.",
		2: "Attention : Ce produit est signalé comme perdu.",
		"-1": "Etat du produit inconnu",
	  };
	  
	  function describeProductState(state: number): string {
		return productStateDescriptions[state] || "État du produit inconnu.";
	  }
	  

	
  return (
      <div className="bg-white shadow-xl rounded-lg max-w-xl mx-auto">
        <div className="p-8">
          <h1 className="text-center text-2xl font-bold text-black">{nftMetadata.metadata.name}</h1>
          <p className="text-center mt-4 text-black">{nftMetadata.metadata.description}</p>
        </div>
        <div className="relative w-full">
			<Image src={nftMetadata.metadata.image} alt={nftMetadata.metadata.name} width={1000} height={1000} className='w-full'/>
        </div>
		<div>
			<p className='text-center mt-4'>{describeProductState(productStateValue)}</p>
			{productStateValue == 0 ? (
				<button 
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto my-4"
				type="button"
				onClick={() => changeProductState(1)}
        		disabled={chargement}>
					Déclarer volé
				</button>
			) :
			(
				<button 
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto my-4"
				type="button"
				onClick={() => changeProductState(0)}
        		disabled={chargement}>
					Déclarer légit
				</button>
			)}
			

		</div>
		<div>
			<p  className="mb-2 text-black" title={contractAddress}>Contract address: {contractAddress.substring(0, 20)}...</p>
			<p className="mb-2 text-black" title={params.tokenId}>Token id: {params.tokenId.substring(0, 20)}...</p>
			<p className="mb-2 text-black">Token chain: {process.env.NEXT_PUBLIC_ETHEREUM_NETWORK}</p>
		
		</div>
    </div>
  );
}

