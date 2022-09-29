import React, { useContext } from 'react';

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from '../../components/HomePage/Loader';
import { PriceContext } from '../../context/PriceContext';


const HomePage = () => {

    const context = useContext(PriceContext);
        
    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row items-start justify-between md:p-20 py-12 px-4">
                
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                    Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                    </p>
                    {
                    !context?.currentAccount &&
                    <button
                     type="button"
                     onClick={context?.connectWallet}
                     className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                     >
                        <AiFillPlayCircle className="text-white mr-2" />
                        <p className="text-white text-base font-semibold">
                            Connect Wallet
                        </p>
                    </button>
                    }
                                
                    
                </div>


                <div className="flex flex-col flex-1 items-center justify-start w-full">
                        <div className="p-3 justify-end items-start flex-col rounded-xl h-40 w-full my-5 eth-card white-glassmorphism" style={{width: '343px'}}>
                            <div className="flex justify-between flex-col w-full h-full">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                        <SiEthereum fontSize={21} color="#fff" />
                                    </div>
                                    <BsInfoCircle fontSize={17} color="#fff" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-normal">
                                    {
                                        context?.currentAccount ? context?.currentAccount : '0xNgocccccccccc'
                                    }
                                    </p>
                                    <p className="text-white font-semibold text-md mt-1">
                                    Ethereum
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:w-96 w-full flex flex-col justify-start">
                            {context?.currentBlock === 0
                            ? <Loader />
                            : (
                                <p
                                className='text-white font-medium text-xl'
                                >
                                New block: {context?.currentBlock}
                                </p>
                            )}
                        </div>
                </div>
            </div>
        </div>
      );
}

export default HomePage;