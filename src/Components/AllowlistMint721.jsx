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

function AllowlistMint721() {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  // ERC721 Advanced Contract Address 
  // Note: Must allowlist the address before using the function 
  const contractAddress = "0x853fA19FB32C5F2a2951168B78ED9eEBF1D7766C";

  // IPFS Metadata URI
  const metadataURI = 'https://ipfs.io/ipfs/bafyreigdlie4rzeuq2p2wfbxirhmobn3fzncre5lrpmth6iyirilfxwy7u/metadata.json';


  //Wallet Connect Using Metamask Connector - Wagmi
  async function connectWallet(connector) {
    const { chain } = await connectAsync({ connector });
  }

  // Contract Interaction 
  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: parseAbi(["function allowlistMint(address recipient, string memory tokenURI, uint256 quantity) payable"]),
    functionName: "allowlistMint",
    args: [address, metadataURI, 1]
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

export default AllowlistMint721;
