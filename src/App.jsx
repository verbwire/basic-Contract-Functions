import "./App.css";
import { useState } from "react";
import { goerli } from "viem/chains";
import { WagmiConfig, createConfig, configureChains, mainnet, useConnect, useAccount } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { infuraProvider } from '@wagmi/core/providers/infura';
import infuraKeys from "./infuraKeys";
import { writeContract } from '@wagmi/core'
import { parseAbi } from "viem";
import SendPayment from "./Components/sendPayment";
import PublicMint from "./Components/PublicMint1155";
import PublicMint721 from "./Components/PublicMint721";
import AllowlistMint721 from "./Components/AllowlistMint721";
import AllowlistMint1155 from "./Components/AllowlistMint1155";

function App() {

  const [buttonState, setButtonState] = useState('Pay 0.01 ETH')
  
  const { chains, publicClient } = configureChains(
    [goerli],
    [infuraProvider({apiKey: infuraKeys})]
  );

  const config = createConfig({
    autoConnect: true,
    connectors: [new MetaMaskConnector({chains})],
    publicClient,
  });




  return (
    <>
      <WagmiConfig config={config}>

        {/*  Uncomment the required component to run it */}

        {/* <SendPayment />  */}
        {/* <PublicMint /> */}
        {/* <PublicMint721 /> */}
        {/* <AllowlistMint721 />  */}
        {/* <AllowlistMint1155 /> */}

      </WagmiConfig>
    </>
  );
}

export default App;
