// components/NFTDisplay.tsx
import { useEffect, useState } from 'react';

interface DisplayMyNftsProps {
  fetchNFTs: () => Promise<string[]>;
}

const DisplayMyNfts: React.FC<DisplayMyNftsProps> = ({ fetchNFTs }) => {
  const [tokenIds, setTokenIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTokenIds = await fetchNFTs();
      setTokenIds(fetchedTokenIds);
    };
    fetchData();
  }, [fetchNFTs]);

  if (tokenIds.length === 0) return <p>No NFTs found.</p>;

  return (
    <div>
      <h2>NFTs Owned:</h2>
      <ul>
        {tokenIds.map((tokenId, index) => (
          <li key={index}>{tokenId}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayMyNfts;
