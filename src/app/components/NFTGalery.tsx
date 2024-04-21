'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NFTGalleryProps {
  tokenIds: string[];
}

interface NFTMetadata {
	name: string;
	description: string;
	image: string;
  }
  
  interface NFT {
	tokenId: string;
	metadata: NFTMetadata;
	imagePinata: string
  }
  


const NFTGallery: React.FC<NFTGalleryProps> = ({ tokenIds }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""; // Adresse de ton contrat déployé
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleClick = (tokenId: string) => {
    router.push(`/nft/${tokenId}`);
  };

   useEffect(() => {
	if (!tokenIds || tokenIds.length === 0) return 
	if (!contractAddress) return;
    const fetchNFTs = async () => {
      const fetchedNFTs = await Promise.all(tokenIds.map(async (tokenId) => {
        try {
          const response = await fetch(`/api/ether_api/get_nft_metadata?contractAddress=${contractAddress}&tokenId=${tokenId}`);
          if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des métadonnées pour le tokenId ${tokenId}: ${response.statusText}`);
          }
          const data = await response.json();
          return { tokenId: tokenId, metadata: data.metadata};
        } catch (error) {
          console.error(error);
          setError('Une erreur est survenue lors de la récupération des métadonnées des NFTs.');
          return null; // Retourner null pour les cas d'erreur, puis filtrer plus tard
        }
      }));

      // Filtrer les éventuelles valeurs null dues aux erreurs
      setNfts(fetchedNFTs.filter((nft): nft is NFT => nft !== null && nft.metadata && nft.metadata.image));
    };

    if (tokenIds.length > 0) {
      fetchNFTs();
    }
  }, [tokenIds, contractAddress]);

 // Importez Image depuis next/image

  // Le reste de votre composant...
  
  return (
	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
	  {nfts.map((nft) => (
		<div key={nft.tokenId} className="relative w-full cursor-pointer group" onClick={() => handleClick(nft.tokenId)}>
		  {/* Conteneur pour le nom du NFT */}
		  <div className="absolute z-10 w-full text-center text-white bg-black bg-opacity-50 p-1 bottom-0 group-hover:bg-opacity-75 transition duration-300 ease-in-out">
			{nft.metadata.name}
		  </div>
  
		  {/* Image du NFT */}<Image
				src={nft?.imagePinata}
				title={nft.metadata.name}
				width={400}
				height={400}
				alt={`NFT ${nft.tokenId}`}
				className="transition duration-300 ease-in-out transform group-hover:scale-105 max-w-full max-h-full"
				/>
		</div>
	  ))}
	</div>
  );
  
  
};



export default NFTGallery;
