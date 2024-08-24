"use client";
import { useState } from "react";
import CoinFlipGame from "../components/coinflipgame";
import { connectWallet } from "../utils/connectWallet";
import { Button } from "@/components/ui/button";
import web3 from "../utils/web3client";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [cryptoBalance, setCryptoBalance] = useState("");

  const getCryptoBalance = async (address) => {
    try {
      // web3.eth.getBalance returns the balance in Wei
      const balanceWei = await web3.eth.getBalance(address);
      // Convert Wei to MATIC using Web3 utils
      const balanceCrypto = web3.utils.fromWei(balanceWei, "ether");
      setCryptoBalance(balanceCrypto);
    } catch (error) {
      console.error("Failed to fetch Goerli balance:", error);
      setCryptoBalance("Failed to fetch balance");
    }
  };

  const handleConnectWallet = async () => {
    const { address, error } = await connectWallet();
    if (address) {
      setWalletAddress(address);
      getCryptoBalance(address); // Fetch and set the Goerli balance
    } else {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 px-20 bg-gradient-to-b from-white to-slate-300 min-h-screen">
      <h1 className="text-5xl font-bold">Welcome to the Coin Flipper!</h1>
      <p className="mt-8 text-3xl">Please Connect Your Wallet: </p>
      <Button className="mt-10" onClick={handleConnectWallet}>
        Connect a Wallet
      </Button>
      {walletAddress && (
        <>
          <div className="py-5 text-center">
            <p>Connected Wallet Address: {walletAddress}</p>
            <p>Available Balance: {cryptoBalance} Sepolia ETH</p>
          </div>
          <CoinFlipGame walletAddress={walletAddress} />
        </>
      )}
      <p className="py-5">
        Developed by{" "}
        <a href="https://kumar-shreyash.netlify.app/" className="text-green-700">
          KumarShreyash TechNologies
        </a>{" "}
        © 2024{" "}
      </p>
    </div>
  );
}
