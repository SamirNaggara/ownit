'use client';

import { useSession } from "next-auth/react";
import MintNFTForm from "../components/MintForm";
import SigninButton from "../components/SigninButton";



export default function Mint() {
	const { data: session } = useSession();

	return (
		<main className="p-24">
			{session ? <MintNFTForm /> : <SigninButton /> }
		</main>
  	)
}
