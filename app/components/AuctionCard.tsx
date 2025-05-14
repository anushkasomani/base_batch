"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Utensils, Bone, Search } from "lucide-react";

export default function PetCard({ petId, imageSrc, owner, metadataUrl }: any) {
  const router = useRouter();
  const [attributes, setAttributes] = useState<any[]>([]);
  const [petName, setPetName] = useState("Unnamed Pet");
  const [hovered, setHovered] = useState(false);
  const [description, setDescription] = useState("");

  const extractTxId = (url: string) => url.split("/").pop()!;

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const txId = extractTxId(metadataUrl);
        const res = await fetch(`https://gateway.irys.xyz/mutable/${txId}`);
        if (res.ok) {
          const data = await res.json();
          setAttributes(data.attributes || []);
          console.log("data",data)
          setPetName(data.name || "Unnamed Pet");
          setDescription(data.description || "");
        }
      } catch (err) {
        console.error("Error loading metadata:", err);
      }
    };

    fetchMetadata();
  }, [metadataUrl]);

  const updateMetadata = async (txId: string, changes: any) => {
    const res = await fetch(`https://gateway.irys.xyz/mutable/${txId}`);
    if (!res.ok) throw new Error("Failed to fetch metadata");
    const oldMeta = await res.json();

    const newMeta = {
      ...oldMeta,
      ...changes,
      attributes: oldMeta.attributes.map((attr: any) => {
        if (changes.attributes) {
          const updated = changes.attributes.find(
            (a: any) => a.trait_type === attr.trait_type
          );
          return updated ? { ...attr, value: attr.value + updated.value } : attr;
        }
        return attr;
      }),
    };

    const metadataBlob = new Blob([JSON.stringify(newMeta)], {
      type: "application/json",
    });
    const metadataFile = new File([metadataBlob], "metadata.json");
    const formData = new FormData();
    formData.append("file", metadataFile);
    formData.append("rootTxId", txId);

    const evolveRes = await fetch("/api/irys/evolve-file", {
      method: "POST",
      body: formData,
    });

    if (!evolveRes.ok) throw new Error("Evolve failed");
    const evolveData = await evolveRes.json();

    const updatedRes = await fetch(`https://gateway.irys.xyz/mutable/${txId}`);
    if (updatedRes.ok) {
      const newMeta = await updatedRes.json();
      setAttributes(newMeta.attributes || []);
      setPetName(newMeta.name || "Unnamed Pet");
    }

    return evolveData;
  };

  const feed = async () => {
    const txId = extractTxId(metadataUrl);
    await toast.promise(
      updateMetadata(txId, { attributes: [{ trait_type: "Happiness", value: 5 }] }),
      {
        loading: "Feeding pet...",
        success: "Pet fed successfully!",
        error: "Failed to feed pet.",
      }
    );
  };

  const train = async () => {
    const txId = extractTxId(metadataUrl);
    await toast.promise(
      updateMetadata(txId, { attributes: [{ trait_type: "Power", value: 5 }] }),
      {
        loading: "Training pet...",
        success: "Pet trained successfully!",
        error: "Failed to train pet.",
      }
    );
  };

  const happiness = attributes.find(attr => attr.trait_type === "Happiness")?.value ?? 0;
  const power = attributes.find(attr => attr.trait_type === "Power")?.value ?? 0;
  const level = attributes.find(attr => attr.trait_type === "Level")?.value ?? 1;

  const handleExplore = () => {
    const queryParams = new URLSearchParams({
      petId,
      owner,
      imageSrc,
      metadataUrl,
      name: petName,
      description: description,
      "stats.happiness": happiness.toString(),
      "stats.memePower": power.toString(),
      "stats.level": level.toString(),
    });

    router.push(`/pet-details?${queryParams.toString()}`);
  };

  return (
    <div
      className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition duration-300 hover:scale-[1.1] hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-72 bg-gray-100">
        <img
          src={imageSrc}
          alt="NFT"
          className="w-full h-full object-cover rounded-xl transform transition duration-300 hover:scale-105 hover:brightness-105"
          onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
        />

        {hovered && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-end items-start p-3 gap-2">
            <div className="flex flex-col gap-2 items-end ml-auto">
              <button
                onClick={feed}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transform transition-transform hover:scale-125"
              >
                <Utensils className="w-7 h-7" />
              </button>
              <button
                onClick={train}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transform transition-transform hover:scale-125"
              >
                <Bone className="w-7 h-7" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-base font-press-start text-gray-800 mb-1">{petName}</h2>
        <div className="text-sm font-courier-prime text-gray-500 mb-1">
          Owner: {owner.slice(0, 6)}...{owner.slice(-4)}
        </div>
        <div className="flex justify-between text-md mb-3">
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg">❤️</span> {happiness}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg">⚡</span> {power}
          </div>
        </div>
        <button
          onClick={handleExplore}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-md text-base flex justify-center items-center gap-2"
        >
          <Search className="w-5 h-5" /> Explore
        </button>
      </div>
    </div>
  );
}
