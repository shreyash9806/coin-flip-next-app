// components/CoinFlipGame.js

import { useState } from "react";
import { sendTransaction } from "../utils/web3client";
import Spinner from "./Spinner";

export default function CoinFlipGame({ walletAddress }) {
  const [coins, setCoins] = useState(0);
  const [flips, setFlips] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState("Flip Coin to begin");
  const [cases, setCases] = useState("Heads");
  const condition = {
    winner: cases,
    loser: cases === "Heads" ? "Tails" : "Heads",
  };

  const [result, setResult] = useState("N/A");
  const [loading, setLoading] = useState(true);
  const flipCoin = async () => {
    if (coins >= 10) {
      setLoading(true);
      try {
        await sendTransaction(walletAddress, 0.00001);

        const random = Math.random();

        const win = random < 0.5;
        setFlips(flips + 1);
        if (win) {
          setWins(wins + 1);
          setCoins(coins + 10);

          setResult("Congrats🎉 you got " + condition.winner);

          setStreak(streak + 1);
          setStatus("You win!");
        } else {
          setLosses(losses + 1);
          setCoins(coins - 10);
          setResult("You Got " + condition.loser + "😔");
          setStreak(0);
          setStatus("You lose!");
        }
      } catch (error) {
        console.error("Transaction failed:", error);
        setStatus("Transaction failed!");
      }
      setLoading(false);
    } else {
      setStatus("You need at least 10 coins to play!");
    }
  };

  const buyCoins = async () => {
    // Assuming 100 coins cost 0.05 ETH (adjust as needed)
    try {
      await sendTransaction(walletAddress, 0.00001);
      setCoins(coins + 100);
      setStatus("Bought 100 coins!");
    } catch (error) {
      console.error("Transaction failed:", error);
      setStatus("Could not buy coins!");
    }
  };

  const resetGame = () => {
    setCoins(0);
    setFlips(0);
    setWins(0);
    setLosses(0);
    setStreak(0);
    setStatus("");
  };

  return (
    <div>
      {/* COin */}

      <h1 className="text-center font-medium text-2xl mb-[20px]">
        Choose Your Luck
      </h1>
      <div className="w-9/12 mb-[20px] mx-auto grid grid-cols-2 gap-5">
        <button
          className={`${
            cases === "Heads" ? "bg-black text-white" : " "
          } border border-black px-5 py-2 
        rounded-md text-xl transition-all duration-300 hover:text-white hover:bg-black`}
          onClick={() => {
            setCases("Heads");
          }}
        >
          Heads
        </button>
        <button
          className={`${
            cases === "Tails" ? "bg-black text-white" : " "
          } border border-black px-5 py-2 
        rounded-md text-xl transition-all duration-300 hover:text-white hover:bg-black`}
          onClick={() => {
            setCases("Tails");
          }}
        >
          Tails
        </button>
      </div>
      <div className="game bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Coinflip</h1>
        <p className="text-lg text-gray-600 mb-6">
          Bet 10 coins per flip. Double it or lose!
        </p>

        <ul className="stats flex justify-between flex-wrap text-center mb-4">
          <StatItem label="Coins" value={coins} />
          <StatItem label="Flips" value={flips} />
          <StatItem label="Win" value={wins} />
          <StatItem label="Lose" value={losses} />
          <StatItem label="Streak" value={streak} />
          <StatItem
            label="Chance"
            value={streak ? (50 / streak).toFixed(2) + "%" : "0%"}
          />
        </ul>
        <h1 className="text-center border-black border px-5 py-2 mb-2 rounded-md cursor-pointer text-xl font-semibold">
          {result === "N/A" ? "N/A" : loading ? <Spinner /> : result}
        </h1>
        <div className="main text-center">
          <button
            className="btn btn-primary inline-block bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded-lg mx-2 mb-4"
            onClick={flipCoin}
          >
            FLIP COIN!
          </button>
          <button
            className="btn btn-small inline-block bg-green-500 hover:bg-green-600 text-white  py-2 px-4 rounded-lg mx-2 mb-4"
            onClick={buyCoins}
          >
            Get Coins
          </button>
          <button
            className="btn btn-small btn-secondary inline-block bg-black hover:bg-red-600 text-white  py-2 px-4 rounded-lg mx-2"
            onClick={resetGame}
          >
            Reset
          </button>
        </div>

        <div className="msg mt-4 p-4 bg-gray-200 rounded-lg text-gray-800 text-center">
          {status}
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <li className="mb-2">
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
    </li>
  );
}
