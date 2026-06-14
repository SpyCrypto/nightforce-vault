"use client";

import { Shield, Wallet, Sparkles } from "lucide-react";
import { useWalletContext } from "./WalletProvider";

export function Navigation() {
  const { isConnected, address, connect, disconnect } = useWalletContext();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-midnight-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-midnight-800 to-midnight-950 border border-spy/30 flex items-center justify-center spy-glow">
              <Shield className="w-5 h-5 text-spy" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">Nightforce</h1>
              <p className="text-xs text-midnight-400 hidden sm:block">Intelligence</p>
            </div>
          </div>

          {/* Center - Powered by */}
          <div className="hidden md:flex items-center gap-2 text-xs text-midnight-400">
            <span>Powered by</span>
            <span className="text-spy font-medium">Midnight</span>
            <span>+</span>
            <span className="text-midnight-300 font-medium">Edda Labs</span>
          </div>

          {/* Wallet Button */}
          <div>
            {isConnected ? (
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-midnight-800/60 border border-spy/30 text-spy hover:bg-midnight-800/80 transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline font-mono text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </button>
            ) : (
              <button
                onClick={connect}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-spy text-midnight-950 font-medium hover:bg-spy-dark transition-all spy-glow"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
