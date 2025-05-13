// 'use client'
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// export interface PetCardProps {
//   petId: string;
//   name: string;
//   imageSrc: string;
//   evolutionLevel: number;
//   stats: {
//     engagement: number;
//     happiness: number;
//     memePower: number;
//   };
//   avatarSrc: string;
//   onFeed?: () => void;
//   onTrain?: () => void;
//   onEvolve?: () => void;
//   onExplore?: () => void;
// }

// const PetCard: React.FC<PetCardProps> = ({
//   petId,
//   name,
//   imageSrc,
//   evolutionLevel,
//   stats,
//   avatarSrc,
//   onFeed = () => {},
//   onTrain = () => {},
//   onEvolve = () => {},
//   onExplore = () => {},
// }) => {
//   const [isHovering, setIsHovering] = useState(false);
//   const router = useRouter();

//   const handleExplore = () => {
//     // Create URL with query parameters
//     const queryParams = new URLSearchParams({
//       petId,
//       name,
//       imageSrc,
//       evolutionLevel: evolutionLevel.toString(),
//       'stats.engagement': stats.engagement.toString(),
//       'stats.happiness': stats.happiness.toString(),
//       'stats.memePower': stats.memePower.toString(),
//       avatarSrc
//     });

//     router.push(`/pet-details?${queryParams.toString()}`);
//   };

//   return (
//     <div
//       className="relative w-64 mx-auto font-sans z-10"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* CARD */}
//       <div
//         className={`
//           relative
//           border rounded-lg ${isHovering ? 'border-gray-600 shadow-md' : 'border-gray-400'}
//           bg-white
//           overflow-hidden
//           transition-all transform duration-300 ease-in-out
//           ${isHovering ? '-translate-y-2 scale-102' : 'translate-y-0 scale-100'}
//         `}
//       >
//         {/* IMAGE CONTAINER */}
//         <div className="relative w-full h-64 bg-white overflow-hidden">
//           {/* IMAGE */}
//           <div
//             className={`
//               relative w-full h-full flex items-center justify-center
//               transition-all transform duration-300 ease-in-out
//               ${isHovering ? 'scale-95' : 'scale-100'}
//             `}
//           >
//             <div className="relative w-4/5 h-4/5">
//               <Image
//                 src={imageSrc}
//                 alt={name}
//                 fill
//                 style={{ objectFit: "contain" }}
//                 className="drop-shadow-sm"
//               />
//             </div>
//           </div>

//           {/* RIGHT PANEL: Feed/Train/Evolve */}
//           <div
//             className={`
//               absolute top-0 right-0 h-full
//               flex flex-col items-end justify-center gap-2 pr-2
//               transition-all duration-300 ease-in-out
//               ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
//               z-20
//             `}
//           >
//             <button
//               onClick={onFeed}
//               className="w-16 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded shadow-sm transition-colors duration-200"
//             >
//               Feed
//             </button>
//             <button
//               onClick={onTrain}
//               className="w-16 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded shadow-sm transition-colors duration-200"
//             >
//               Train
//             </button>
//             <button
//               onClick={onEvolve}
//               className="w-16 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded shadow-sm transition-colors duration-200"
//             >
//               Evolve
//             </button>
//           </div>
//         </div>

//         {/* INFO & STATS */}
//         <div className="p-4 z-10 relative bg-white">
//           <h2 className="text-xl font-bold text-gray-700">{name}</h2>
//           <p className="text-xs text-gray-500 mb-2">
//             ID: #{petId} · Level: {evolutionLevel}
//           </p>
//           <div className="grid grid-cols-3 text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
//             <div className="flex items-center justify-center">
//               <span className="mr-1">❤️</span>
//               <span className="font-medium">{stats.engagement}</span>
//             </div>
//             <div className="flex items-center justify-center">
//               <span className="mr-1">😊</span>
//               <span className="font-medium">{stats.happiness}</span>
//             </div>
//             <div className="flex items-center justify-center">
//               <span className="mr-1">🔥</span>
//               <span className="font-medium">{stats.memePower}</span>
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM BAR: Explore More */}
//         <div
//           onClick={handleExplore}
//           className={`
//             absolute left-0 right-0 bottom-0
//             bg-gray-300 text-gray-600 text-center font-medium
//             py-2
//             transform transition-transform duration-300 ease-in-out
//             ${isHovering ? 'translate-y-0' : 'translate-y-full'}
//             cursor-pointer hover:bg-gray-300
//             z-20
//           `}
//         >
//           Explore More
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PetCard;

// export default function PetCard({ petId, imageSrc, owner }) {
//   return (
//     <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//       <img
//         src={imageSrc}
//         alt={`NFT ${petId}`}
//         className="w-32 h-32 object-cover rounded mb-2"
//       />
//       <div className="text-sm text-gray-700 font-bold mb-1">
//         Token ID: {petId}
//       </div>
//       <div className="text-xs text-gray-500 break-all">Owner: {owner}</div>
//     </div>
//   );
// }

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