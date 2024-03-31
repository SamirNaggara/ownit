// pages/api/ether_api/get_all_nft.ts
import { ethers } from 'ethers';
import ContractABI from '../../../contract/contractABI.json'; // Assurez-vous que le chemin est correct et considérez d'utiliser un import dynamique si nécessaire
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

// Définir le type pour la réponse de l'API
interface ApiResponse {
  tokenIds?: string[];
  error?: string;
}

export async function GET(req: NextApiRequest) {
  const address = req.nextUrl.searchParams.get('address') as string; // Cast en string pour s'assurer du type

  const provider = new ethers.JsonRpcProvider(process.env.INFURIA_ENDPOINT || '');
  
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''; // Remplacez par l'adresse de votre contrat
  const contract = new ethers.Contract(contractAddress, ContractABI, provider);

  try {
    const fromZeroAddress = ethers.ZeroAddress;
    const transferEvents = await contract.queryFilter(
      contract.filters.Transfer(fromZeroAddress, address),
      0,
      'latest'
    );
	
	// Ici on peux essyer de filtrer un peu mieux les NFT, mais j'ai pas trop compris comment
    const tokenIds = transferEvents.map(event => {
		// Vérifiez que 'args' et 'tokenId' existent et sont du type attendu
			return event.args.tokenId.toString();
		
	}).filter(tokenId => tokenId !== null);
	console.log(`Token ids: ${tokenIds}`);
	
		return new Response(JSON.stringify({ tokenIds }), {
			status: 200, // Définir le code de statut HTTP
			headers: {
			'Content-Type': 'application/json', // Définir le type de contenu
			},
		}); 
  } catch (error) {
    console.error(error);
	return new Response(JSON.stringify({ error: 'Something went wrong' }), {
		status: 500, // Définir le code de statut HTTP
		headers: {
		'Content-Type': 'application/json', // Définir le type de contenu
		},
	}); 
  }
}
