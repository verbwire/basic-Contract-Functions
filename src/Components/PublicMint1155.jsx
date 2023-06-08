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
import { BigNumber } from "ethers";

function PublicMint() {
  const [buttonState, setButtonState] = useState("Mint NFT");
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  const contractAddress = "0xF91f977C497d79551C327D27346527e7c1192cE8";

  //Wallet Connect Using Metamask Connector - Wagmi
  async function connectWallet(connector) {
    const { chain } = await connectAsync({ connector });
  }

  // Contract Interaction
  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: parseAbi(['function mint(uint256 id, uint256 quantity) external payable']),
    functionName: "mint",
    args: [1, 1],
    value: parseEther('0.01'),
  });

  const { write } = useContractWrite(config);

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
          <button onClick={() => write?.()}>{buttonState}</button>
          <div>
            <button onClick={() => disconnect?.()}>Disconnect</button>
          </div>
        </>
      )}
    </>
  );
}

export default PublicMint;
