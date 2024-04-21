'use client';

import Image from 'next/image';
import ConnectWallet from './components/ConnectWallet';
import WalletButton from './components/WalletButton';
import WalletInfo from './components/WalletInfo';
import MintNFTForm from './components/MintForm';
import Link from 'next/link';
import { useWallet } from './context/WalletContext';
import { useSession } from 'next-auth/react';
import S_hero from './accueil/sections/S_hero';
import S_auth from './accueil/sections/S_auth';
import S_stolen from './accueil/sections/S_stolen';
import S_contact from './accueil/sections/S_contact';

export default function Home() {
  const { account } = useWallet();
  const { data: session } = useSession();

  return (
    <main>
		<div className="homeContainer">
			<S_hero />
			<S_auth />
			<S_stolen />
			<S_contact />
		</div>
        <Link
          href="/my-nfts"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto w-fit mt-5">
          Mes NFT&apos;s
        </Link>
        <Link
          href="/mint"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto w-fit mt-5">
          Mint mon propre NFT
        </Link>
    </main>
  );
}
