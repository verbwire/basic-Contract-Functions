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

function SendPayment() {
  const [buttonState, setButtonState] = useState("Send 0.01 ETH");
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  // Commerce Contract Address Deployed with Verbwire.
  const contractAddress = "0x853fA19FB32C5F2a2951168B78ED9eEBF1D7766C";

  // IPFS Metadata URI
  const metadataURI = 'https://ipfs.io/ipfs/bafyreic4juevsqhsqxfmf5u6sna2whwkxneqfhnzffjrdsn7spbq7ntvxm/metadata.json';


  //Wallet Connect Using Metamask Connector - Wagmi
  async function connectWallet(connector) {
    const { chain } = await connectAsync({ connector });
  }

  // Contract Interaction 
  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: parseAbi(["function makePayment( string memory data ) public payable"]),
    functionName: "makePayment",
    value: parseEther("0.01"),
    args: [' '],
  });  

  const { write } =  useContractWrite(config);
  

  useEffect(() => {
    if (write && buttonState !== "Sent!") {
      setButtonState("Sent!");
    }
  }, [write, buttonState]);

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

export default SendPayment;
