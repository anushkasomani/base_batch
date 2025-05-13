import React from "react";
import { useRouter } from "next/navigation";
// import { Link } from "next/link"; // or "next/link" if using Next.js

export default function PetCard({ petId, imageSrc, owner, metadataUrl }) {
  const router = useRouter();
  const handleExplore = () => {
    // Create URL with query parameters
    const queryParams = new URLSearchParams({
      petId,
      owner,
      imageSrc,
      metadataUrl,
    });

    router.push(`/pet-details?${queryParams.toString()}`);
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="w-full h-60 p-3 bg-gray-100 flex items-center justify-center">
        <img
          src={imageSrc}
          alt="NFT"
          className="w-full h-full object-cover rounded-xl"
          onError={(e) =>
            (e.currentTarget.src = "https://via.placeholder.com/150")
          }
        />
      </div>
      <div className="p-4">
        <div className="mt-2 pt-2 border-t">
          <p className="font-mono text-purple-500">Pet ID:</p>
          <p className="text-xs text-blue-600 break-all font-mono bg-gray-50 p-1.5 rounded mb-2">
            {petId}
          </p>

          <p className="font-mono text-purple-500">Owner:</p>
          <p className="text-xs text-blue-600 break-all font-mono bg-gray-50 p-1.5 rounded mb-2">
            {owner}
          </p>

          <p className="font-mono text-purple-500">Metadata:</p>
          <p className="text-xs text-blue-600 break-all font-mono bg-gray-50 p-1.5 rounded mb-2">
            {metadataUrl}
          </p>

          <div className="mt-3 pt-3 border-t">
            <button
              onClick={handleExplore}
              className={`w-full 
                bg-purple-700 hover:bg-purple-800
                 
               text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center font-bold`}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
