// NOTE: This runs only for those accounts which are on the Allowlist, else throws an Error.

import React, { useEffect, useState } from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
} from "wagmi";
import { parseAbi, parseEther } from "viem";

function AllowlistMint1155() {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  // ERC1155 Advanced Contract Address 
  // Note: Must allowlist the address before using the function 
  const contractAddress = "0xD1c130d8FA022d764F61Dac7a63641Ae1eB9b4a8";


  //Wallet Connect Using Metamask Connector - Wagmi
  async function connectWallet(connector) {
    const { chain } = await connectAsync({ connector });
  }

  // Contract Interaction 
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: parseAbi(["function allowlistMint(uint256 id, uint256 qty) external payable"]),
    functionName: "allowlistMint",
    args: [0, 1]
  });  

  const { write, isSuccess, isLoading } =  useContractWrite(config);
  

  return (
    <>
      {!isConnected &&
        connectors.map((connector) => {
          const { id, name } = connector;
          return (
            <button onClick={() => connectWallet(connector)} key={id} id={id}>
              Connect to {name}
            </button>
          );
        })}
      {isConnected && (
        <>
          <button onClick={() => write?.()}>
            {isSuccess ? 'Minted' : isLoading ? 'Loading' : 'Mint NFT'}
          </button>
          <div>
            <button onClick={() => disconnect?.()}>Disconnect</button>
          </div>
        </>
      )}
    </>
  );
}

export default AllowlistMint1155;
