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
		process.env.NEXT_PUBLIC_ETHEREUM_NETWORK,
		process.env.INFURIA_API_KEY
	);
	if (!provider) {
		return new Response(JSON.stringify({ error: 'Failed to get provider.' }), {
			status: 456,
			headers: { 'Content-Type': 'application/json' },
		});
	}


  try {
	  // Initialiser le contrat avec ethers
	  const contract = new ethers.Contract(contractAddress, ContractABI, provider);
	  if (!contract) throw new Error('Failed to get contract.');
	  
	  // Récupérer l'URI des métadonnées pour le tokenId spécifié
	  const tokenBrut = await contract.tokenURI(tokenId);
	  const tokenURI = tokenBrut.toString() + "?pinataGatewayToken=" + process.env.PINATA_GATEWAY;

		if (!tokenURI) throw new Error('Failed to get token URI.');
	  const productState  = (await contract.getProductState(tokenId)).toString();
	  if (!productState) throw new Error('Failed to get product state.');
	  // Récupérer les métadonnées à partir de l'URI
	  // Notez que cette étape peut varier en fonction du format de l'URI (par exemple, si c'est une URL IPFS)
	  const metadataResponse = await fetch(tokenURI);
	  if (!metadataResponse.ok) throw new Error('Failed to fetch metadata. : ' + tokenURI);
	  const metadata = await metadataResponse.json();
	  if (!metadata) throw new Error('Failed to parse metadata.');

	  const imagePinata = metadata.image +  "?pinataGatewayToken=" + process.env.PINATA_GATEWAY;
	return new Response(JSON.stringify({ 
		metadata, 
		productState: productState, 
		imagePinata: imagePinata}), {
		status: 200, // Définir le code de statut HTTP
		headers: {
		'Content-Type': 'application/json', // Définir le type de contenu
		},
	}); 
  } catch (error) {
	console.log(error);
	return new Response(JSON.stringify({ error: 'Failed to fetch NFT metadata. : ' + error }), {
		status: 500, // Définir le code de statut HTTP
		headers: {
		'Content-Type': 'application/json', // Définir le type de contenu
		},
	});
  }
}
