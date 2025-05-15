"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename, 
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import Image from "next/image";

export default function Navbar() {
  const { address } = useAccount();

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-5 border-4 border-white bg-green-80 m-4">
      {/* Logo Image */}
      <div className="w-14 h-14 relative">
        <Image
          src="/log1.png"
          alt="Logo"
          fill
          className="object-contain"
        />
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex space-x-40 text-lg font-bold font-press-start-2p text-[#8B4513]">
        <li>
          <Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-yellow-300 transition-colors">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link>
        </li>
      </ul>

      {/* Wallet */}
      <div className="ml-4 font-courier-prime">
        <Wallet>
          <ConnectWallet>
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address className={color.foregroundMuted} />
              <EthBalance />
            </Identity>
            <WalletDropdownBasename />
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </nav>
  );
}
