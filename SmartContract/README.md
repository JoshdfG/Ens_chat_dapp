SwapContract
This Solidity smart contract facilitates token swaps between Ethereum (ETH), DAI stablecoin (DAI), and Chainlink (LINK) tokens using Chainlink price oracles.

Overview
This contract enables users to exchange tokens by leveraging Chainlink oracles to determine fair market prices. It supports various token pairs such as ETH-DAI, ETH-LINK, DAI-LINK, etc., allowing users to swap between them seamlessly.

Features
Token Swapping: Users can exchange tokens using different swap functions provided by the contract.
Price Oracles: Chainlink price oracles are utilized to fetch accurate token prices for determining exchange rates.
Events: The contract emits a SwapSuccessful event upon successful token swaps, providing details of the sender's address and the exchanged amounts.
Contract Details
State Variables: Instances of ERC-20 tokens for DAI, LINK, and WETH (wrapped Ether), along with interfaces for Chainlink price oracles for ETH/USD, DAI/USD, and LINK/USD price feeds.
Constructor: Initializes the contract by setting up token and oracle addresses.
Swap Functions: External functions are provided to swap between different token pairs, each ensuring balance checks, calculating exchange rates, and executing token transfers.
Internal Functions: Includes helper functions scalePrice and getDerivedPrice to adjust price precision and calculate derived exchange rates, respectively.
Usage
Users interact with the contract through supported swap functions to exchange tokens. Prior to swapping, users must ensure they have sufficient balances of the tokens they wish to exchange.

License
This code is provided under the Unlicense. Refer to UNLICENSE for details.

Contract Address
The deployed instance of this contract can be found at [0x965c52e0e643368eF7DD9DBabfb3167337AfF77E](https://sepolia.etherscan.io/address/0x965c52e0e643368eF7DD9DBabfb3167337AfF77E#code)

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test --rpc-url https://eth-sepolia.g.alchemy.com/v2/OFbBMdGvMDsq04pqUdIS5xUhyzl7N0JI --evm-version cancun -vvvvv
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
