'use client';

import { useSession } from "next-auth/react";
import MintNFTForm from "../components/MintForm";
import SigninButton from "../components/SigninButton";



export default function Mint() {
	const { data: session } = useSession();

	console.log("session", session);
	return (
		<main className="p-24">
			{session ? <MintNFTForm /> : <SigninButton /> }
		</main>
  	)
}
