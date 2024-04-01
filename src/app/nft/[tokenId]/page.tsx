'use client';

// pages/nft/[tokenId].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface NFTMetadata {
  name: string;
  description: string;
  image: string; // URL de l'image
}

export default function NFTPage({ params }: { params: { tokenId: string } }) {
	/*
		Samir, tu as la page ici qui va afficher tout ce qu'il y a besoin d'afficher concernant un NFT précis
		Normalement, tu a l'info dans params.tokenId
		Plus qu'a fait la requete api pour avoir les métadonnées du NFT, et tu peux les affichers

		Tu dois ensuite trouver un moyen de chopper l'info de l'état du NFT
		Puis un bouton isItMine.

		Et ce sera deja vraiment pas mal, tu pourras etre fier de toi
	*/ 
}

