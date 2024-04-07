'use client';

import { useSession } from "next-auth/react";
import MintNFTForm from "../components/MintForm";



export default function Mint() {
	const { data: session } = useSession();

	if (!session) {
		return (
			<main className="p-24">
				<p className="text-center text-xl">You need to be connected to mint an NFT</p>
			</main>
		)
	}
	return (
		<main className="p-24">
			<MintNFTForm />
		</main>
  	)
}
