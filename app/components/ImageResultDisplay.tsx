// "use client";
// import { Button } from "./ui/button";
// import { Download, RotateCcw, MessageCircle } from "lucide-react";
// import { useState } from "react";
// import { HistoryItem, HistoryPart } from "@/lib/types";
// import { Address } from "@coinbase/onchainkit/identity";
// import { useAccount } from "wagmi";
// import {
//   Transaction,
//   TransactionButton,
//   TransactionToast,
// } from "@coinbase/onchainkit/transaction";
// import { clickContractAbi } from "@/utils/contractAbi";

// interface ImageResultDisplayProps {
//   imageUrl: string;
//   backstory: string | null;
//   petName: string | null;
//   onReset: () => void;
//   conversationHistory?: HistoryItem[];
// }

// export function ImageResultDisplay({
//   imageUrl,
//   backstory,
//   petName,
//   onReset,
//   conversationHistory = [],
// }: ImageResultDisplayProps) {
//   const { address, isConnected } = useAccount();
//   const [showHistory, setShowHistory] = useState(false);

//   const clickContractAddress = "0x1709ea3f41ae3dfacf36f950c970aa346c7e35b1";

//   const handleDownload = () => {
//     // Create a temporary link element
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = `gemini-image-${Date.now()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const toggleHistory = () => {
//     setShowHistory(!showHistory);
//   };

//   const handleMintNFT = async () => {
//     console.log(imageUrl);
//     if (!imageUrl.startsWith("data:image")) {
//       console.error("Invalid image data URL");
//       return;
//     }

//     // Extract base64 data from the imageUrl
//     const base64Data = imageUrl.split(",")[1];
//     const binary = atob(base64Data);
//     const array = Uint8Array.from(binary, (char) => char.charCodeAt(0));
//     const file = new File([array], "pet-image.png", { type: "image/png" });

//     // Step 1: Upload image to Irys
//     const formData1 = new FormData();
//     formData1.append("file", file);
//     formData1.append(
//       "tags",
//       JSON.stringify([{ name: "application-id", value: "MyNFTDrop" }])
//     );

//     const imgRes = await fetch("/api/irys/upload-file", {
//       method: "POST",
//       body: formData1,
//     });

//     if (!imgRes.ok) {
//       const err = await imgRes.json();
//       throw new Error("Image upload failed: " + err.error);
//     }

//     const imgResData = await imgRes.json();
//     const imgTxId = imgResData.id;
//     const imageIrysUrl = `https://gateway.irys.xyz/mutable/${imgTxId}`;

//     // Step 2: Upload metadata file (as the evolving data)
//     const metadata = {
//       name: petName,
//       backstory,
//       image: imageIrysUrl,
//       creator: address,
//     };

//     const metadataBlob = new Blob([JSON.stringify(metadata)], {
//       type: "application/json",
//     });
//     const metadataFile = new File([metadataBlob], "metadata.json");

//     const formData2 = new FormData();
//     formData2.append("file", metadataFile);
//     formData2.append(
//       "tags",
//       JSON.stringify([{ name: "Root-TX", value: imgTxId }])
//     );

//     const metaRes = await fetch("/api/irys/upload-file", {
//       method: "POST",
//       body: formData2,
//     });

//     if (!metaRes.ok) {
//       const err = await metaRes.json();
//       throw new Error("Metadata upload failed: " + err.error);
//     }

//     const metaResData = await metaRes.json();

//     const NFTTxId = metaResData.id;
//     const NFTIrysUrl = `https://gateway.irys.xyz/mutable/${NFTTxId}`;

//     console.log("Success!");
//     console.log("image TX:", imageIrysUrl);
//     console.log("NFT metadata TX:", NFTIrysUrl);

//     return [
//       {
//         address: clickContractAddress,
//         abi: clickContractAbi,
//         functionName: "safeMint",
//         args: [NFTIrysUrl], // NFTIrysUrl from your upload logic
//       },
//     ];
//   };

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10">
//         <div className="rounded-lg bg-muted p-1">
//           <img
//             src={imageUrl}
//             alt="Generated"
//             className="max-w-[320px] h-auto w-[300px]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <div className="p-1 rounded-lg bg-muted">
//             <h1 className="text-2xl text-muted-foreground font-pixelify">
//               {petName}
//             </h1>
//           </div>

//           <div className="p-1 rounded-lg bg-muted">
//             <h3 className="text-xl font-medium mb-2 font-pixelify">Lore-</h3>
//             <p className="text-md text-muted-foreground font-courier-prime">
//               {backstory}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="space-x-2 flex flex-col space-y-2">
//             <Button
//               className="outline sm bg-[#C9C9AA] font-pixelify"
//               onClick={handleDownload}
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download
//             </Button>
//             {conversationHistory.length > 0 && (
//               <Button
//                 className="outline sm bg-[#C9C9AA] font-pixelify"
//                 onClick={toggleHistory}
//               >
//                 <MessageCircle className="w-4 h-4 mr-2" />
//                 {showHistory ? "Hide History" : "Show History"}
//               </Button>
//             )}
//             <Button
//               className="outline sm bg-[#C9C9AA] font-pixelify"
//               onClick={onReset}
//             >
//               <RotateCcw className="w-4 h-4 mr-2" />
//               Create New Image
//             </Button>
//             {/* <Button
//               className="outline sm bg-[#C9C9AA] font-pixelify"
//               onClick={handleMintNFT}
//             >
//               Create
//             </Button> */}
//             <Transaction chainId={84532} calls={handleMintNFT}>
//               <TransactionButton
//                 className=" text-white rounded-lg px-6 py-3 font-bold"
//                 text="Mint NFT"
//               />
//             </Transaction>
//           </div>
//         </div>
//       </div>

//       {showHistory && conversationHistory.length > 0 && (
//         <div className="p-4 rounded-lg font-courier-prime">
//           <h3 className="text-sm font-medium mb-2">Conversation History</h3>
//           <div className="space-y-4">
//             {conversationHistory.map((item, index) => (
//               <div key={index} className={`p-3 rounded-lg bg-secondary`}>
//                 <p
//                   className={`text-sm font-medium mb-1 ${
//                     item.role === "user" ? "text-foreground" : "text-primary"
//                   }`}
//                 >
//                   {item.role === "user" ? "You" : "Gemini"}
//                 </p>
//                 <div className="space-y-1">
//                   {item.parts.map((part: HistoryPart, partIndex) => (
//                     <div key={partIndex}>
//                       {part.text && <p className="text-sm">{part.text}</p>}
//                       {part.image && (
//                         <div className="mt-2 overflow-hidden rounded-md">
//                           <img
//                             src={part.image}
//                             alt={`${item.role} image`}
//                             className="object-contain w-[300px] h-auto"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
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
import { clickContractAbi } from "@/utils/contractAbi";

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
  const [imageIrysUrl, setImageIrysUrl] = useState<string | null>(null);
  const [metadataIrysUrl, setMetadataIrysUrl] = useState<string | null>(null);

  const clickContractAddress = "0x1709ea3f41ae3dfacf36f950c970aa346c7e35b1";

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

  const postToTelegram = async (imageUrl: string, metadataUrl: string) => {
    try {
      // Format the caption with Markdown
      const caption = `
🎨 *Pet Name:* ${petName || "Unnamed Pet"}  
📖 *Backstory:* ${backstory || "No backstory available"}
🔗 *NFT Details:* Minted by ${address}
🌐 *Metadata:* ${metadataUrl}
`;

      const payload = {
        chat_id: "-1002668376054", // Your Telegram channel ID
        photo: imageUrl, // The Irys image URL
        caption: caption,
        parse_mode: "Markdown",
      };

      const response = await fetch("/api/telegram-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Telegram posting failed:", errorData);
        return false;
      }

      console.log("Successfully posted to Telegram!");
      return true;
    } catch (error) {
      console.error("Error posting to Telegram:", error);
      return false;
    }
  };

  const handleMintNFT = async () => {
    console.log(imageUrl);
    if (!imageUrl.startsWith("data:image")) {
      console.error("Invalid image data URL");
      return;
    }

    try {
      // Extract base64 data from the imageUrl
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
      setImageIrysUrl(imageIrysUrl);

      // Step 2: Upload metadata file (as the evolving data)
      const metadata = {
        name: petName,
        backstory,
        image: imageIrysUrl,
        creator: address,
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataFile = new File([metadataBlob], "metadata.json");

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
      setMetadataIrysUrl(NFTIrysUrl);

      console.log("Success!");
      console.log("image TX:", imageIrysUrl);
      console.log("NFT metadata TX:", NFTIrysUrl);

      return [
        {
          address: clickContractAddress,
          abi: clickContractAbi,
          functionName: "safeMint",
          args: [NFTIrysUrl], // NFTIrysUrl from your upload logic
        },
      ];
    } catch (error) {
      console.error("Error in minting process:", error);
      return null;
    }
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
            <Transaction
              chainId={84532}
              calls={handleMintNFT}
              onSuccess={(result) => {
                if (imageIrysUrl && metadataIrysUrl) {
                  postToTelegram(imageIrysUrl, metadataIrysUrl);
                }
              }}
            >
              <TransactionButton
                className="text-white rounded-lg px-6 py-3 font-bold"
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
