"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PetDetails() {
  const searchParams = useSearchParams();
  const petId = searchParams.get("petId");
  const name = searchParams.get("name");
  const imageSrc = searchParams.get("imageSrc");
  const metadataUrl = searchParams.get("metadataUrl");
  const owner = searchParams.get("owner");
  const description = searchParams.get("description");
  const multiplier = searchParams.get("multiplier");
  const backstory = searchParams.get("backstory");
  const happiness = searchParams.get("stats.happiness");
  const memePower = searchParams.get("stats.memePower");
  const level = searchParams.get("stats.level");
  const points = Number(multiplier) * (Number(happiness) + Number(memePower));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 shadow-2xl rounded-2xl p-8">
        <h1 className="text-2xl font-press-start-2p mb-8 text-gray-700 text-center tracking-tight">
          {name}
        </h1>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-10">
            {imageSrc && (
              <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-lg p-4 flex items-center justify-center w-80 h-80 transform transition duration-300 hover:scale-105 hover:brightness-105">
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

            <div>
              <p className="text-lg font-semibold text-gray-800">Lore:</p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded break-words font-courier-prime">
                {description || backstory || "This pet has no lore yet..."}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <p className="text-lg font-semibold text-gray-800">Pet ID:</p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded break-all font-mono">
                {petId}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">Level</p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded">
                {level}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">
                Happiness ❤️
              </p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded">
                {happiness}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">Power ⚡</p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded">
                {memePower}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">Multiplier:</p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded break-all">
                {multiplier}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">Points 🔥</p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded break-all">
                {points}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">
                Creator Address:
              </p>
              <p className="text-md bg-gray-100 text-gray-700 p-2 rounded break-all">
                {owner}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">
                Metadata URL:
              </p>
              <Link
                href={metadataUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md text-blue-600 hover:underline break-all"
              >
                {metadataUrl}
              </Link>
            </div>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 mt-4 rounded-lg font-semibold shadow transition duration-200"
              onClick={() => alert("Hook this up to evolve logic")}
            >
              Evolve Pet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
