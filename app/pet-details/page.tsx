"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PetDetails() {
  const searchParams = useSearchParams();

  // Get all parameters from the URL
  const petId = searchParams.get("petId");
  const name = searchParams.get("name");
  const imageSrc = searchParams.get("imageSrc");
  const metadatUrl = searchParams.get("metadataUrl");
  const owner = searchParams.get("owner");

  // Parse the stats from URL parameters
  const engagement = searchParams.get("stats.engagement");
  const happiness = searchParams.get("stats.happiness");
  const memePower = searchParams.get("stats.memePower");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-700 text-center tracking-tight">
          Pet Details
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            {imageSrc && (
              <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-md p-4 flex items-center justify-center w-80 h-80">
                <Image
                  src={imageSrc}
                  alt={name || "Pet"}
                  width={320}
                  height={320}
                  className="rounded-lg object-cover w-full h-full"
                  style={{ maxHeight: 320, maxWidth: 320 }}
                />
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
                <span className="text-xl font-bold text-pink-600">
                  ❤️ {engagement}
                </span>
                <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  Engagement
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
                <span className="text-xl font-bold text-yellow-500">
                  😊 {happiness}
                </span>
                <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  Happiness
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
                <span className="text-xl font-bold text-orange-600">
                  🔥 {memePower}
                </span>
                <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  Meme Power
                </span>
              </div>
            </div>
            <div className=" rounded-lg p-4 shadow mt-4">
              <p className="font-mono text-sm text-gray-700 mb-1">
                ID:{" "}
                <p className="text-xs text-gray-500 break-all font-mono bg-gray-100 p-1.5 rounded mb-2">
                  {petId}
                </p>
              </p>
              <p className="font-mono text-sm text-gray-700 mb-1 break-all">
                Owner:{" "}
                <p className="text-xs text-gray-500 break-all font-mono bg-gray-100 p-1.5 rounded mb-2">
                  {owner}
                </p>
              </p>
              <p className="font-mono text-sm text-gray-700 mb-1 break-all">
                Metadata:{" "}
                <p className="text-xs text-gray-500 break-all font-mono bg-gray-100 p-1.5 rounded mb-2">
                  <Link
                    href={`${metadatUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 break-all"
                  >
                    {metadatUrl}
                  </Link>
                </p>
              </p>
              <p className="font-mono text-sm text-gray-700 break-all">
                Image:{" "}
                <p className="text-xs text-gray-500 break-all font-mono bg-gray-100 p-1.5 rounded mb-2">
                  <Link
                    href={`${imageSrc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 break-all"
                  >
                    {imageSrc}
                  </Link>
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}