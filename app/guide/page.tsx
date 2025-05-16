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
          <div className="text-gray-700 text-base md:text-lg space-y-6 w-full max-w-2xl">
            <h2 className="font-bold text-xl md:text-2xl text-center mb-4">✨ How to Play: Your NFT Pet Adventure! ✨</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-1">🔑 1. Login & Get Ready</h3>
                <p>Connect your <span className="text-blue-600 font-semibold">smart wallet</span> to unlock a world where your digital pet's story begins!</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">🪄 2. Mint Your Unique NFT Pet</h3>
                <p>Let your imagination run wild! <span className="font-semibold">Use AI to generate your one-of-a-kind pet and its backstory</span>—choose its look, invent a quirky name, and let the story unfold. When you’re happy, mint your pet and make it yours forever!</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">📦 3. What Makes Your Pet Special?</h3>
                <ul className="list-disc list-inside ml-6">
                  <li><span className="font-semibold">Creator:</span> That’s you! (Your wallet or base name)</li>
                  <li><span className="font-semibold">Backstory:</span> Written and expanded as your pet grows</li>
                  <li><span className="font-semibold">Happiness & Power:</span> Level these up!</li>
                  <li><span className="font-semibold">Level:</span> Starts at <span className="font-bold">1 (Baby Pet)</span></li>
                  <li><span className="font-semibold">Multiplier & Points:</span> For ranking and rewards</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">🍖 4. Feed & 🏋️ Train Your Pet</h3>
                <div className="ml-2">
                  <p>Help your pet grow by feeding and training it:</p>
                  <ul className="list-disc list-inside ml-6">
                    <li><span className="font-bold">Feed</span>: +5 Happiness, +1 Power, +0.1 Multiplier</li>
                    <li><span className="font-bold">Train</span>: +1 Happiness, +5 Power, +0.15 Multiplier</li>
                    <li><span className="font-bold">Points</span>: (Happiness + Power) × Multiplier</li>
                  </ul>
                  <p className="mt-1">The more you care, the stronger and happier your pet becomes!</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">🦋 5. Evolve Your Pet!</h3>
                <p>When your points reach <span className="font-semibold">20 × your current level</span>, your pet can evolve to the next stage! Each evolution adds new twists to its backstory and makes your NFT pet even more special. Your pet's journey continues and grows with time!</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">🏆 6. Climb the Leaderboard</h3>
                <p>Earn points by leveling up and boosting your pet's social media fame. The top pets and their creators win awesome rewards and bragging rights!</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">🌎 7. More Than Just NFTs</h3>
                <p>This isn’t just another NFT marketplace—it’s a living, evolving world for your digital companions. Show them off, make friends, and join a vibrant, playful community!</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded text-yellow-800 text-sm">
              <span className="font-bold">Pro Tip:</span> Ready to mint your first pet? Head to the <span className="font-semibold text-blue-600">Mint</span> page and let the adventure begin!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}