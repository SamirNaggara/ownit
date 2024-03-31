// pages/api/getAllNFTs.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import ContractABI from '../../contract/contractABI.json'; // Assurez-vous que le chemin est correct et considérez d'utiliser un import dynamique si nécessaire

// Définir le type pour la réponse de l'API
interface ApiResponse {
  tokenIds?: string[];
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const address = req.query.address as string; // Cast en string pour s'assurer du type

  // Remplacez 'YOUR_INFURA_API_KEY' par votre clé API réelle
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

    const tokenIds = transferEvents.map(event => {
		// Vérifiez que 'args' et 'tokenId' existent et sont du type attendu
		if ('args' in event && event.args && 'tokenId' in event.args) {
		  return event.args.tokenId.toString();
		} else {
		  // Gérez le cas où l'événement n'a pas la structure attendue
		  return null;
		}
	  }).filter(tokenId => tokenId !== null); 

    res.status(200).json({ tokenIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
