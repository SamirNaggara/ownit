// pages/api/nft/[contractAddress]/[tokenId].ts
import { ethers } from 'ethers';

// Assurez-vous que votre ABI contient la fonction tokenURI ou une fonction équivalente.
import ContractABI from '../../../contract/contractABI.json';
import { NextRequest } from 'next/server';

interface ApiResponse {
  metadata?: any;
  error?: string;
}

export async function GET(req: NextRequest) {
  // Extraction du tokenId et de l'adresse du contrat depuis l'URL de la requête
  const tokenId = req.nextUrl.searchParams.get('tokenId') as string; // Cast en string pour s'assurer du type
  const contractAddress = req.nextUrl.searchParams.get('contractAddress') as string; // Cast en string pour s'assurer du type

  if (!contractAddress || typeof contractAddress !== 'string' || !tokenId || typeof tokenId !== 'string') {
	return new Response(JSON.stringify({ error: 'SBad request: Contract address and tokenId are required.' }), {
		status: 400, // Définir le code de statut HTTP
		headers: {
		'Content-Type': 'application/json', // Définir le type de contenu
		},
	}); 
  }

  // Initialiser le provider Ethereum avec Infura
	const provider = new ethers.InfuraProvider(
		process.env.ETHEREUM_NETWORK,
		process.env.INFURIA_API_KEY
	);


  try {
    // Initialiser le contrat avec ethers
    const contract = new ethers.Contract(contractAddress, ContractABI, provider);

    // Récupérer l'URI des métadonnées pour le tokenId spécifié
    const tokenURI = await contract.tokenURI(tokenId);

    // Récupérer les métadonnées à partir de l'URI
    // Notez que cette étape peut varier en fonction du format de l'URI (par exemple, si c'est une URL IPFS)
	console.log(tokenURI)
    const metadataUrl = tokenURI.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${tokenURI.substring(7)}` : tokenURI;
    const metadataResponse = await fetch(metadataUrl);
    const metadata = await metadataResponse.json();

	return new Response(JSON.stringify({ metadata }), {
		status: 200, // Définir le code de statut HTTP
		headers: {
		'Content-Type': 'application/json', // Définir le type de contenu
		},
	}); 
  } catch (error) {
    console.error(error);
	return new Response(JSON.stringify({ error: 'Failed to fetch NFT metadata.'  }), {
		status: 500, // Définir le code de statut HTTP
		headers: {
		'Content-Type': 'application/json', // Définir le type de contenu
		},
	});
  }
}
