// utils/web3Client.js

import Web3 from 'web3';

const polygonMainnetChainId = '0x89'; // Hexadecimal for 137, the chain ID for Polygon Mainnet
const goerliTestnetChainId = '0x5'; // Hexadecimal for chain ID for Goerli Testnet
const sepoliaTestnetChainId = '0xaa36a7'; // Hexadecimal for chain ID for Goerli Testnet

let web3;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);

    // Check if connected to Polygon Mainnet
    window.ethereum.request({ method: 'eth_chainId' })
        .then(chainId => {
            if (chainId !== sepoliaTestnetChainId) {
                alert('You are not connected to the Sepolia Testnet. Please switch your network to Sepolia Testnet in your MetaMask.');
                throw new Error("Incorrect Network. Please switch to Sepolia Testnet.");
            }
        })
        .catch(error => {
            console.error("Error fetching chain ID:", error);
        });
} else {
    console.log("MetaMask not found. Please install MetaMask.");
}

export const sendTransaction = async (fromAddress, amountInEther) => {
    if (!web3) {
        throw new Error("Web3 not initialized");
    }

    const amountInWei = web3.utils.toWei(amountInEther.toString(), 'ether');

    try {
        await web3.eth.sendTransaction({
            from: fromAddress,
            to: '0x3e76bc82dff6393cf7a74d240308fb11a1bc8279', 
            value: amountInWei,
            gas: 21000 //gas limit per transaction is set here as 21000, not required in polygon mainnet
        });
    } catch (error) {
        throw error;
    }
};

export default web3;
