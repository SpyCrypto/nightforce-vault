"use client";

import { useState, useCallback, useEffect } from "react";

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useWallet(): WalletState {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nightforce_wallet");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.connected && data.address) {
          setIsConnected(true);
          setAddress(data.address);
        }
      } catch {
        localStorage.removeItem("nightforce_wallet");
      }
    }
  }, []);

  const connect = useCallback(async () => {
    // Simulate wallet connection for demo
    const mockAddress = "mnid1" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    
    setIsConnected(true);
    setAddress(mockAddress);
    setShowOnboarding(true);
    
    localStorage.setItem("nightforce_wallet", JSON.stringify({
      connected: true,
      address: mockAddress,
    }));
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
    localStorage.removeItem("nightforce_wallet");
  }, []);

  return {
    isConnected,
    address,
    showOnboarding,
    setShowOnboarding,
    connect,
    disconnect,
  };
}
