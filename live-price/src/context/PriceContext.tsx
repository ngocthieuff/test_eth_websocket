import { ethers, providers } from "ethers";
import React, { useEffect, useState } from "react";

type ContextType = {
    fetchNewBlock: any;
    currentBlock: number;
};

export const PriceContext = React.createContext<undefined | ContextType>(undefined);

const { ethereum } = window;

export const PriceProvider = ({ children } : { children : any }) => {

    const [currentAccount, setCurrentAccount] = useState('0x97f8c83e0d4eb5c8305bfcb14f33d37eaf0c6428');
    const [currentBlock, setCurrentBlock] = useState(0);
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log('No accounts found');
            }    
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object found.");
        }
    }
    
    async function fetchNewBlock() {
        const provider = new ethers.providers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758');
        provider.on('block', async (blockNumber) => {
            setCurrentBlock(blockNumber)
          });
    }

    const contextType: ContextType = {
        fetchNewBlock: fetchNewBlock,
        currentBlock: currentBlock,
    }

    useEffect(() => {
        connectWallet();
        fetchNewBlock();
    }, []);
    return (
       <PriceContext.Provider value={contextType}>
            {children}
       </PriceContext.Provider>
    )
}