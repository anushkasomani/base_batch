"use client";
import { Button } from "./ui/button";
import { Download, RotateCcw, MessageCircle } from "lucide-react";
import { useState } from "react";
import { HistoryItem, HistoryPart } from "@/lib/types";
import { Address } from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
} from "@coinbase/onchainkit/transaction";
import abi from "../../utils/abi.json";
import { contractAddress } from "../../utils/contractAddress";

interface ImageResultDisplayProps {
  imageUrl: string;
  backstory: string | null;
  petName: string | null;
  onReset: () => void;
  conversationHistory?: HistoryItem[];
}

export function ImageResultDisplay({
  imageUrl,
  backstory,
  petName,
  onReset,
  conversationHistory = [],
}: ImageResultDisplayProps) {
  const { address, isConnected } = useAccount();
  const [showHistory, setShowHistory] = useState(false);

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `gemini-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleMintNFT = async () => {
    if (!imageUrl.startsWith("data:image")) {
      console.error("Invalid image data URL");
      return;
    }

    // Convert base64 image to File
    const base64Data = imageUrl.split(",")[1];
    const binary = atob(base64Data);
    const array = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const file = new File([array], "pet-image.png", { type: "image/png" });

    // Step 1: Upload image to Irys
    const formData1 = new FormData();
    formData1.append("file", file);
    formData1.append(
      "tags",
      JSON.stringify([{ name: "application-id", value: "MyNFTDrop" }])
    );

    const imgRes = await fetch("/api/irys/upload-file", {
      method: "POST",
      body: formData1,
    });

    if (!imgRes.ok) {
      const err = await imgRes.json();
      throw new Error("Image upload failed: " + err.error);
    }

    const imgResData = await imgRes.json();
    const imgTxId = imgResData.id;
    const imageIrysUrl = `https://gateway.irys.xyz/mutable/${imgTxId}`;

    // Step 2: Create NFT metadata
    const metadata = {
      name: petName ?? "Unnamed Pet",
      description: backstory ?? "An enigmatic creature.",
      image: imageIrysUrl,
      creator: address,
      attributes: [
        { trait_type: "Level", value: 1 },
        { trait_type: "Happiness", value: 5 },
        { trait_type: "Power", value: 5 },
        { trait_type: "Multiplier", value: 1 },
        { trait_type: "Points", value: 0 },
      ],
    };

    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const metadataFile = new File([metadataBlob], "metadata.json");

    // Step 3: Upload metadata to Irys
    const formData2 = new FormData();
    formData2.append("file", metadataFile);
    formData2.append(
      "tags",
      JSON.stringify([{ name: "Root-TX", value: imgTxId }])
    );

    const metaRes = await fetch("/api/irys/upload-file", {
      method: "POST",
      body: formData2,
    });

    if (!metaRes.ok) {
      const err = await metaRes.json();
      throw new Error("Metadata upload failed: " + err.error);
    }

    const metaResData = await metaRes.json();
    const NFTTxId = metaResData.id;
    const NFTIrysUrl = `https://gateway.irys.xyz/mutable/${NFTTxId}`;

    console.log("Success!");
    console.log("Image TX:", imageIrysUrl);
    console.log("NFT metadata TX:", NFTIrysUrl);

    // Return transaction call
    return [
      {
        address: contractAddress,
        abi: abi,
        functionName: "safeMint",
        args: [NFTIrysUrl],
      },
    ];
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10">
        <div className="rounded-lg bg-muted p-1">
          <img
            src={imageUrl}
            alt="Generated"
            className="max-w-[320px] h-auto w-[300px]"
          />
        </div>

        <div className="flex flex-col">
          <div className="p-1 rounded-lg bg-muted">
            <h1 className="text-2xl text-muted-foreground font-pixelify">
              {petName}
            </h1>
          </div>

          <div className="p-1 rounded-lg bg-muted">
            <h3 className="text-xl font-medium mb-2 font-pixelify">Lore-</h3>
            <p className="text-md text-muted-foreground font-courier-prime">
              {backstory}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-x-2 flex flex-col space-y-2">
            <Button
              className="outline sm bg-[#C9C9AA] font-pixelify"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            {conversationHistory.length > 0 && (
              <Button
                className="outline sm bg-[#C9C9AA] font-pixelify"
                onClick={toggleHistory}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {showHistory ? "Hide History" : "Show History"}
              </Button>
            )}
            <Button
              className="outline sm bg-[#C9C9AA] font-pixelify"
              onClick={onReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Create New Image
            </Button>
            {/* <Button
              className="outline sm bg-[#C9C9AA] font-pixelify"
              onClick={handleMintNFT}
            >
              Create
            </Button> */}
            <Transaction chainId={8453} calls={handleMintNFT}>
              <TransactionButton
                className="outline sm bg-[#2D80C0] font-pixelify text-black hover:bg-[#C9C9AA]"
                text="Mint NFT"
              />
            </Transaction>
          </div>
        </div>
      </div>

      {showHistory && conversationHistory.length > 0 && (
        <div className="p-4 rounded-lg font-courier-prime">
          <h3 className="text-sm font-medium mb-2">Conversation History</h3>
          <div className="space-y-4">
            {conversationHistory.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg bg-secondary`}>
                <p
                  className={`text-sm font-medium mb-1 ${
                    item.role === "user" ? "text-foreground" : "text-primary"
                  }`}
                >
                  {item.role === "user" ? "You" : "Gemini"}
                </p>
                <div className="space-y-1">
                  {item.parts.map((part: HistoryPart, partIndex) => (
                    <div key={partIndex}>
                      {part.text && <p className="text-sm">{part.text}</p>}
                      {part.image && (
                        <div className="mt-2 overflow-hidden rounded-md">
                          <img
                            src={part.image}
                            alt={`${item.role} image`}
                            className="object-contain w-[300px] h-auto"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
