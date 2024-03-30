import React, { useState } from 'react';
import { useMintFunction } from '../context/useContract'; // Ajuste le chemin selon ta structure

const MintNFTForm: React.FC = () => {
  const [to, setTo] = useState('');
  const [url, setUrl] = useState('');
  const { mintNFT } = useMintFunction();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

	const mint = async () => {
		const result = await mintNFT(to, url);
		if (result)
		{
			setError(result.error)
		}
	}
	mint()
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-xl mx-auto'>
		<h2 className='text-center text-xl font-bold my-10'>Mint un NFT</h2>
		{error && <p className='text-green-500 text-center'>{error}</p>}
		<div>
      		<input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Destinataire (adresse)" className="w-full mb-8"/>
		</div>
		<div>
      		<input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL du NFT" className="w-full" />
		</div>
      <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150 block mx-auto my-5'>Mint NFT</button>
    </form>
  );
};

export default MintNFTForm;
