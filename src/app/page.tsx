'use client';

import Image from 'next/image'
import ConnectWallet from './components/ConnectWallet'
import WalletButton from './components/WalletButton'
import WalletInfo from './components/WalletInfo'
import MintNFTForm from './components/MintForm'
import Link from 'next/link';
import { useWallet } from './context/WalletContext';
import { useSession } from "next-auth/react";

export default function Home() {
	const { account } = useWallet();
	const { data: session } = useSession();

	return (

		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
					<h1 className='text-5xl'>SafeOut - NFT</h1>
					<Link href="/my-nfts" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto w-fit mt-5'>Mes NFT&apos;s</Link>
					<Link href="/mint" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto w-fit mt-5'>Mint mon propre NFT</Link>
					
				</div>
		</main>
	)
}
