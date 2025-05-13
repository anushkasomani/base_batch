"use client";

import { Button } from "./ui/button";
import { Download, RotateCcw, MessageCircle } from "lucide-react";
import { useState } from "react";
import { HistoryItem, HistoryPart } from "@/lib/types";
import { Address } from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import toast, { Toaster } from "react-hot-toast";

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
  const { address } = useAccount();
  const [showHistory, setShowHistory] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `pet-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleMintNFT = async () => {
    const toastId = toast.loading("Uploading image to Irys...");

    try {
      if (!imageUrl.startsWith("data:image")) {
        throw new Error("Invalid image data URL");
      }

      // Convert base64 to File
      const base64Data = imageUrl.split(",")[1];
      const binary = atob(base64Data);
      const array = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      const file = new File([array], "pet-image.png", { type: "image/png" });

      // Step 1: Upload image
      const formData1 = new FormData();
      formData1.append("file", file);
      formData1.append("tags", JSON.stringify([{ name: "application-id", value: "MyNFTDrop" }]));

      const imgRes = await fetch("/api/irys/upload-file", {
        method: "POST",
        body: formData1,
      });

      if (!imgRes.ok) {
        const err = await imgRes.json();
        throw new Error("Image upload failed: " + err.error);
      }

      const imgResData = await imgRes.json();
      const imageIrysUrl = `https://gateway.irys.xyz/mutable/${imgResData.id}`;

      toast.loading("Uploading metadata to Irys...", { id: toastId });

      // Step 2: Upload metadata
      const metadata = {
        name: petName,
        backstory,
        image: imageIrysUrl,
        creator: address,
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
      const metadataFile = new File([metadataBlob], "metadata.json");

      const formData2 = new FormData();
      formData2.append("file", metadataFile);
      formData2.append("tags", JSON.stringify([{ name: "Root-TX", value: imgResData.id }]));

      const metaRes = await fetch("/api/irys/upload-file", {
        method: "POST",
        body: formData2,
      });

      if (!metaRes.ok) {
        const err = await metaRes.json();
        throw new Error("Metadata upload failed: " + err.error);
      }

      const metaResData = await metaRes.json();
      const metadataUrl = `https://gateway.irys.xyz/mutable/${metaResData.id}`;

      toast.success("NFT metadata uploaded successfully!", { id: toastId });
      console.log("✅ NFT Metadata URL:", metadataUrl);
    } catch (err: any) {
      console.error(err);
      toast.error("Minting failed: " + err.message, { id: toastId });
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10">
        <div className="rounded-lg bg-muted p-1">
          <img src={imageUrl} alt="Generated" className="max-w-[320px] h-auto w-[300px]" />
        </div>

        <div className="flex flex-col">
          <div className="p-1 rounded-lg bg-muted">
            <h1 className="text-2xl text-muted-foreground font-pixelify">{petName}</h1>
          </div>
          <div className="p-1 rounded-lg bg-muted">
            <h3 className="text-xl font-medium mb-2 font-pixelify">Lore-</h3>
            <p className="text-md text-muted-foreground font-courier-prime">{backstory}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-x-2 flex flex-col space-y-2">
            <Button className="outline sm bg-[#C9C9AA] font-pixelify" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            {conversationHistory.length > 0 && (
              <Button className="outline sm bg-[#C9C9AA] font-pixelify" onClick={toggleHistory}>
                <MessageCircle className="w-4 h-4 mr-2" />
                {showHistory ? "Hide History" : "Show History"}
              </Button>
            )}
            <Button className="outline sm bg-[#C9C9AA] font-pixelify" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Create New Image
            </Button>
            <Button className="outline sm bg-[#C9C9AA] font-pixelify" onClick={handleMintNFT}>
              Create
            </Button>
          </div>
        </div>
      </div>

      {showHistory && conversationHistory.length > 0 && (
        <div className="p-4 rounded-lg font-courier-prime">
          <h3 className="text-sm font-medium mb-2">Conversation History</h3>
          <div className="space-y-4">
            {conversationHistory.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg bg-secondary`}>
                <p className={`text-sm font-medium mb-1 ${item.role === "user" ? "text-foreground" : "text-primary"}`}>
                  {item.role === "user" ? "You" : "Gemini"}
                </p>
                <div className="space-y-1">
                  {item.parts.map((part: HistoryPart, partIndex) => (
                    <div key={partIndex}>
                      {part.text && <p className="text-sm">{part.text}</p>}
                      {part.image && (
                        <div className="mt-2 overflow-hidden rounded-md">
                          <img src={part.image} alt={`${item.role} image`} className="object-contain w-[300px] h-auto" />
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
