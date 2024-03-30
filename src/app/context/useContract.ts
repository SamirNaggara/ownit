'use client';

// hooks/useContract.ts
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

declare global {
	interface Window {
	  ethereum?: {
		request: (request: { method: string; params?: any[] | Record<string, any> }) => Promise<any>;
	  };
	}
  }
  

const contractABI = require("../contract/contractABI.json"); // Chemin vers l'ABI de ton contrat
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""; // Adresse de ton contrat déployé
export const useContract = () => {
	const [contract, setContract] = useState<ethers.Contract | null>(null);
  
	useEffect(() =>  {

		const initContract = async () => {
		
		
			if (typeof window !== 'undefined' && window.ethereum) {
				try {
				// Crée un nouveau provider Ethereum
				const provider = new ethers.BrowserProvider(window.ethereum)
				// Crée un signer
				const signer = await provider.getSigner();
				// Crée une instance du contrat avec le signer, qui permet d'envoyer des transactions
				const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
				setContract(contractInstance);
				} catch (error) {
					console.error("Failed to create contract instance:", error);
				
				}
			}
		}
		initContract()
	}, []);
  
	return contract;
  };

export const useMintFunction = () => {
  const contract = useContract();

  const mintNFT = async (to: string, url: string) => {
    if (!contract) {
      return { success: false, error: 'Contract not loaded' };
    }

    // Générer un ID unique pour cet NFT en utilisant BigInt
    const randomHexString = '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const tokenId = BigInt(randomHexString);
    
    try {
      // Appelle la fonction `safeMint` de ton contrat avec l'ID unique, l'adresse destinataire, et l'URL
      const tx = await contract.safeMint(to, tokenId, url);
      await tx.wait(); // Attente de la confirmation de la transaction
      console.log('NFT Minted! ID:', tokenId);

      // Retourner un objet indiquant le succès et incluant l'ID du token
      return { success: true, error: 'NFT minted successfully' };
    } catch (error) {
      console.error('Error minting NFT:', error);

      // Retourner un objet indiquant l'échec et incluant le message d'erreur
      return { success: false, error: 'Something unexpected happen' } ;
    }
  };

  return { mintNFT };
};
