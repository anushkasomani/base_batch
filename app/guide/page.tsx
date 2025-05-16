'use client'

export default function Page() {
    return (
    <div className="relative min-h-screen w-full ">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: 'url(/bg-gen.png)' }}
      />
      <img 
        src="/totoro_bg.png" 
        alt="Totoro"
        className="absolute bottom-0 right-0 z-40 w-[250px] h-auto max-w-full md:max-w-[30%] sm:max-w-[40%]"
      />
      <div className="relative min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-4/5 min-h-screen overflow-y-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-4 flex items-center  flex-col space-y-1">
          <h1 className="font-press-start-2p text-xl md:text-2xl font-extrabold text-center text-gray-800 mb-6">
            Guide
          </h1>
          <div className="text-gray-700 text-base md:text-lg space-y-8 w-full max-w-2xl">
            {/* Step 1 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">🔑 Login & Get Ready</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Connect your <span className="text-blue-600 font-semibold">smart wallet</span> to unlock the world of digital pets.</li>
              </ul>
            </div>
            {/* Step 2 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">🪄 Mint Your Unique NFT Pet</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Use AI to generate your one-of-a-kind pet <b>and its backstory</b>.</li>
                <li>Choose its look, invent a quirky name, and mint it to make it yours forever!</li>
              </ul>
            </div>
            {/* Step 3 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">📦 What Makes Your Pet Special?</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Creator:</b> That’s you! (Your wallet or base name)</li>
                <li><b>Backstory:</b> Written and expanded as your pet grows</li>
                <li><b>Happiness & Power:</b> Level these up!</li>
                <li><b>Level:</b> Starts at <b>1 (Baby Pet)</b></li>
                <li><b>Multiplier & Points:</b> For ranking and rewards</li>
              </ul>
            </div>
            {/* Step 4 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">🍖 Feed & 🏋️ Train Any Pet!</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>You can feed and train <b>your own pets</b> <span className="text-green-600">and</span> <b>other pets you like</b>!</li>
                <li><b>Feed:</b> +5 Happiness, +1 Power, +0.1 Multiplier</li>
                <li><b>Train:</b> +1 Happiness, +5 Power, +0.15 Multiplier</li>
                <li><b>Points:</b> (Happiness + Power) × Multiplier</li>
                <li>The more you care, the stronger and happier the pets become!</li>
              </ul>
            </div>
            {/* Step 5 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">🦋 Evolve Your Pet</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>When <b>points ≥ 20 × current level</b>, your pet can evolve to the next stage.</li>
                <li>Each evolution adds new twists to its backstory and makes your NFT pet even more special.</li>
                <li>Your NFT pet's journey continues and grows with time!</li>
              </ul>
            </div>
            {/* Step 6 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">🤝 Show Love & Interact (On & Off-Chain!)</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Show your love to pets off-chain too—it helps them climb up the leaderboard!</li>
                <li>Join our <a href="https://t.me/+2xZAYWsJ-6tmYjZl" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Telegram community</a> to connect, share, and celebrate your pets together!</li>
              </ul>
            </div>
            {/* Step 7 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">🏆 Climb the Leaderboard</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Top pets are determined using their points and also offchain popularity!</li>
              </ul>
            </div>
            {/* Step 8 */}
            <div>
              <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">🌎 More Than Just NFTs</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>This isn’t just another NFT marketplace—it’s a living, evolving world for your digital companions.</li>
                <li>Show them off, make friends, and join a vibrant, playful community!</li>
              </ul>
            </div>
            <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded text-yellow-800 text-base text-center">
              <span className="font-bold">Pro Tip:</span> Ready to mint your first pet? Head to the <span className="font-semibold text-blue-600">Mint</span> page and let the adventure begin!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}