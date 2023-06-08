# Basic Contract Functions

The **Basic-Contract-Functions** application is an easy-to-use app for public and allowlist minting of NFTs, as well as making payments through the Verbiwre contracts. It provides a simple and user-friendly interface for interacting with the contracts.

## Components

The application consists of five components. Before running each component, make sure to perform the following steps:

1. Enter your Infura key in the `infuraKeys.jsx` file located inside the Components folder.
2. Uncomment the required component in the `App.jsx` file.
3. Enter the respective contract address inside the file associated with the selected component.

Please note that all the contracts used by the application must be categorized as "Advanced" and deployed using the Verbwire Platform.

To deploy the contracts, you can use the following endpoint: [Endpoint: Deploy Contract](https://docs.verbwire.com/reference/post_nft-deploy-deploycontract)

To allowlist addresses, use the following endpoint: [Endpoint: Add to Allowlist](https://docs.verbwire.com/reference/post_nft-update-addtoallowlist)

## Required Functions

The following functions are required to run the various components of the application:

- Public Mint ERC721 NFT: 
  ```js
  function mint(address recipient, string memory tokenURI, uint256 quantity) payable
  ```
- Public Mint ERC1155 NFT: 
  ```js
  function mint(uint256 id, uint256 quantity) external payable
  ```
- Allowlist Mint ERC721 NFT: 
  ```js
  function allowlistMint(address recipient, string memory tokenURI, uint256 quantity) payable
  ```
- Allowlist Mint ERC1155 NFT: 
  ```js
  function allowlistMint(uint256 id, uint256 qty) external payable
  ```

**Note:** Before running the `allowlistMint` functions, the address must be allowlisted using the endpoint mentioned earlier.

- Send Payment to Commerce Contract: 
  ```js
  function makePayment(string memory data) public payable
  ```

## Running the Application

To run the application, execute the following command:

```js
npm run dev
```

This command will start the application and make it available for use.

Feel free to explore and interact with the various components of the application. If you have any questions or encounter any issues, please reach out for assistance.
