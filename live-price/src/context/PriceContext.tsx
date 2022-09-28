import { ethers, providers } from "ethers";
import React, { useEffect, useState } from "react";

type ContextType = {
    test: any;
    currentBlock: number;
};

export const PriceContext = React.createContext<undefined | ContextType>(undefined);

const { ethereum } = window;

export const PriceProvider = ({ children } : { children : any }) => {

    const [currentAccount, setCurrentAccount] = useState('0x97f8c83e0d4eb5c8305bfcb14f33d37eaf0c6428');
    const [currentBlock, setCurrentBlock] = useState(9999);
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

    const getContract = () => {
        const kyberAbi = [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'trader',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'contract IERC20',
                  name: 'src',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'contract IERC20',
                  name: 'dest',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'destAddress',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'actualSrcAmount',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'actualDestAmount',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'platformWallet',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'platformFeeBps',
                  type: 'uint256',
                },
              ],
              name: 'ExecuteTrade',
              type: 'event',
            },
            {
              inputs: [
                { internalType: 'contract ERC20', name: 'src', type: 'address' },
                { internalType: 'contract ERC20', name: 'dest', type: 'address' },
                { internalType: 'uint256', name: 'srcQty', type: 'uint256' },
              ],
              name: 'getExpectedRate',
              outputs: [
                { internalType: 'uint256', name: 'expectedRate', type: 'uint256' },
                { internalType: 'uint256', name: 'worstRate', type: 'uint256' },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'contract IERC20', name: 'src', type: 'address' },
                { internalType: 'contract IERC20', name: 'dest', type: 'address' },
                { internalType: 'uint256', name: 'srcQty', type: 'uint256' },
                { internalType: 'uint256', name: 'platformFeeBps', type: 'uint256' },
                { internalType: 'bytes', name: 'hint', type: 'bytes' },
              ],
              name: 'getExpectedRateAfterFee',
              outputs: [
                { internalType: 'uint256', name: 'expectedRate', type: 'uint256' },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'contract IERC20', name: 'src', type: 'address' },
                { internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
                { internalType: 'contract IERC20', name: 'dest', type: 'address' },
                { internalType: 'address payable', name: 'destAddress', type: 'address' },
                { internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
                { internalType: 'uint256', name: 'minConversionRate', type: 'uint256' },
                {
                  internalType: 'address payable',
                  name: 'platformWallet',
                  type: 'address',
                },
              ],
              name: 'trade',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'contract ERC20', name: 'src', type: 'address' },
                { internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
                { internalType: 'contract ERC20', name: 'dest', type: 'address' },
                { internalType: 'address payable', name: 'destAddress', type: 'address' },
                { internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
                { internalType: 'uint256', name: 'minConversionRate', type: 'uint256' },
                { internalType: 'address payable', name: 'walletId', type: 'address' },
                { internalType: 'bytes', name: 'hint', type: 'bytes' },
              ],
              name: 'tradeWithHint',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'contract IERC20', name: 'src', type: 'address' },
                { internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
                { internalType: 'contract IERC20', name: 'dest', type: 'address' },
                { internalType: 'address payable', name: 'destAddress', type: 'address' },
                { internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
                { internalType: 'uint256', name: 'minConversionRate', type: 'uint256' },
                {
                  internalType: 'address payable',
                  name: 'platformWallet',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'platformFeeBps', type: 'uint256' },
                { internalType: 'bytes', name: 'hint', type: 'bytes' },
              ],
              name: 'tradeWithHintAndFee',
              outputs: [{ internalType: 'uint256', name: 'destAmount', type: 'uint256' }],
              stateMutability: 'payable',
              type: 'function',
            },
          ];
        
        const provider = new ethers.providers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758');
        const signer = provider.getSigner(currentAccount.toString());
        const kyberContract = new ethers.Contract('0x818E6FECD516Ecc3849DAf6845e3EC868087B755', kyberAbi, signer);
    
        return kyberContract;
    }
    
    async function test() {
        const contract = getContract()
        const result = await contract.getExpectedRate(
            '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            1000);
        const provider = new ethers.providers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758');
        provider.on('block', async (blockNumber) => {
            setCurrentBlock(blockNumber)
            const result = await contract.getExpectedRate(
                '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                1000);
          });
    }

    const contextType: ContextType = {
        test: test,
        currentBlock: currentBlock,
    }

    useEffect(() => {
        connectWallet();
    }, []);
    return (
       <PriceContext.Provider value={contextType}>
            {children}
       </PriceContext.Provider>
    )
}