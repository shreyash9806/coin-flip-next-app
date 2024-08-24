import Web3 from 'web3';

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({ method: "eth_requestAccounts" });
            return {
                address: addressArray[0],
            };
        } catch (err) {
            return { address: "", error: err.message };
        }
    } else {
        return {
            address: "",
            error: "MetaMask is not installed. Please install it to use this app.",
        };
    }
};
