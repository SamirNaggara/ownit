'use client';

import Image from 'next/image'
import ConnectWallet from './components/ConnectWallet'
import WalletButton from './components/WalletButton'
import WalletInfo from './components/WalletInfo'
import MintNFTForm from './components/MintForm'
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
				<h1>Welcome to My NFT Minting App</h1>
				<WalletInfo />
				<Link href="/mint" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto w-fit mt-5'>Mint mon propre NFT</Link>
    		</div>
    </main>
  )
}
