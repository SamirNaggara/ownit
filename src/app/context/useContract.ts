'use client';

// hooks/useContract.ts
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

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
	const [showConnectModal, setShowConnectModal] = useState(false);

	const initContract = useCallback(async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInstance);
				return contractInstance
            } catch (error) {
                console.error('Error connecting to the contract:', error);
            }
        } else {
            setShowConnectModal(true);
			const currentUrl = window.location.href;
        		window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
        }
    }, [contract]);

    return { contract, showConnectModal, initContract };
};

export const useMintFunction = () => {
	const { contract, initContract } = useContract();

  
  const mintNFT = async (to: string, url: string) => {
    if (!contract) {
		await initContract();
		if (!contract)
      		return { success: false, error: 'Contract not loaded' };
    }

    // Générer un ID unique pour cet NFT en utilisant BigInt
    const randomHexString = '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const tokenId = BigInt(randomHexString);
    
    try {
      // Appelle la fonction `safeMint` de ton contrat avec l'ID unique, l'adresse destinataire, et l'URL
      const tx = await contract.safeMint(to, tokenId, url);
      await tx.wait(); // Attente de la confirmation de la transaction

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

export const useGetProductState = () => {
	const { contract, initContract } = useContract();
  
	
	const getProductState = async (tokenId: string) => {
		if (!contract) {
			await initContract();
			if (!contract)
				  return -1
		}
	  
	  try {
		// Appelle la fonction `sgetProduct state` de ton contrat avec l'ID unique, l'adresse destinataire, et l'URL
		const result = await contract.getProductState(tokenId) as number;
		// Retourner un objet indiquant le succès et incluant l'ID du token
		return result;
	  } catch (error) {
  
		// Retourner un objet indiquant l'échec et incluant le message d'erreur
		return -1 ;
	  }
	};

	return {getProductState}
  };

export const useSetProductState = () => {
	const { contract, initContract } = useContract();



	const setProductState = async (tokenId: string, state: number) => {
		let contractInstance = contract
		if (!contractInstance) {
			contractInstance = await initContract() as any;
			if (!contractInstance)
				{
					return { success: false, error: 'Contract not loaded' };

				}
		}
		
		
		try {
			// Appelle la fonction `sgetProduct state` de ton contrat avec l'ID unique, l'adresse destinataire, et l'URL
			const tx = await contractInstance.setProductState(tokenId, state);
			await tx.wait();
			// Retourner un objet indiquant le succès et incluant l'ID du token
			return { success: true, error: 'Done' };
		} catch (error) {

		//	etourner un objet indiquant l'échec et incluant le message d'erreur
			return { success: false, error: 'Erreur pendant la transction de modification de l\état du produit' };

		}
	};

	return {setProductState}
};