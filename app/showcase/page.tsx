"use client";
import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, JsonRpcProvider } from "ethers";
import PetCard from "../components/AuctionCard";
import abi from "../../utils/abi.json";
import { ethers } from "ethers";
import { contractAddress } from "../../utils/contractAddress";

export default function HomepagePreview() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const provider = new JsonRpcProvider(
          process.env.NEXT_PUBLIC_ALCHEMY_BASE_API_URL
        );
        const contract = new Contract(contractAddress, abi, provider);

        const totalSupply = await contract.totalSupply();
        const nftList = [];

        for (let i = 0; i < Number(totalSupply); i++) {
          const tokenId = await contract.tokenByIndex(i);
          const owner = await contract.ownerOf(tokenId);
          const tokenURI = await contract.tokenURI(tokenId);
          const multiplier = await contract.tokenIdToMultiplier(tokenId);
          const formatedMultiplier = (parseFloat(multiplier) / 1e18).toFixed(2);
          const level = await contract.tokenIdToLevel(tokenId);
          const formatedLevel = (parseFloat(level) / 1e18).toFixed(0);

          // If IPFS, convert to gateway URL
          let metadataUrl = tokenURI;
          if (tokenURI.startsWith("ipfs://")) {
            metadataUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
          }

          // Fetch metadata
          let image = "";
          try {
            const res = await fetch(metadataUrl);
            const metadata = await res.json();
            image = metadata.image || metadata.image_url || "";
            if (image.startsWith("ipfs://")) {
              image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
            }
          } catch {
            image = "";
          }

          nftList.push({
            tokenId: tokenId.toString(),
            owner,
            image,
            metadataUrl,
            formatedMultiplier,
            formatedLevel,
          });
        }
        setNfts(nftList);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      }
      setLoading(false);
    };

    fetchNFTs();
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/igb.png)" }}
      />
      <div className="relative min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-4/5 min-h-screen overflow-y-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-8 flex items-center justify-center flex-col space-y-1">
          {/* <Wallet/> */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-7 font-press-start-2p text-center">
              Minted NFTs
            </h2>
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {nfts.map((nft) => (
                  <PetCard
                    key={nft.tokenId}
                    petId={nft.tokenId}
                    imageSrc={nft.image}
                    owner={nft.owner}
                    metadataUrl={nft.metadataUrl}
                    multiplier={nft.formatedMultiplier}
                    NftLevel={nft.formatedLevel}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
