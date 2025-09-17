# SimpleStorage (Hardhat)

A minimal Hardhat project showcasing a simple Solidity contract, scripts, tasks, test scaffolding, gas usage reporting, and code coverage. It supports local development and Sepolia testnet deployment.

- Contracts: [contracts/SimpleStorage.sol](contracts/SimpleStorage.sol)
- Config: [hardhat.config.js](hardhat.config.js)
- Deploy script: [scripts/deploy.js](scripts/deploy.js)
- Custom task: [tasks/block-number.js](tasks/block-number.js)
- Tests: [test/test-deploy.js](test/test-deploy.js)

## Features

- Hardhat Toolbox, Ethers, Chai
- Network configs for Hardhat/localhost and Sepolia
- Etherscan verification
- Gas usage reporting (writes to gas-report.txt)
- Solidity coverage

## Project structure

```
.
├── hardhat.config.js
├── contracts/
│   └── SimpleStorage.sol
├── scripts/
│   └── deploy.js
├── tasks/
│   └── block-number.js
├── test/
│   └── test-deploy.js
├── coverage/ (generated)
├── artifacts/ (generated)
├── cache/ (generated)
├── gas-report.txt (generated)
└── .env (not committed)
```

Key files:
- Hardhat config: [hardhat.config.js](hardhat.config.js)
  - Networks: Hardhat, Localhost, Sepolia
  - Etherscan + gas reporter + coverage integration
  - Solidity: 0.8.28
- Contract: [contracts/SimpleStorage.sol](contracts/SimpleStorage.sol)
- Script: [scripts/deploy.js](scripts/deploy.js)
- Task: [tasks/block-number.js](tasks/block-number.js)

## Prerequisites

- Node.js ≥ 18 and npm ≥ 9
- A Sepolia RPC endpoint (e.g., Alchemy, Infura)
- An Ethereum account private key with Sepolia ETH
- Etherscan API key (for verification)
- CoinMarketCap API key (for gas price in USD)

## Setup

1) Install dependencies
```sh
npm install
```

2) Create .env
```sh
cp .env .env.example 2>/dev/null || true
```

Edit [.env](.env) and set:
```ini
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/XXXXX"
SEPOLIA_PRIVATE_KEY="0xyourprivatekey"
ETHERSCAN_API_KEY="your-etherscan-api-key"
COINMARKETCAP_API_KEY="your-coinmarketcap-api-key"
```

Notes:
- .env is ignored by Git. See [.gitignore](.gitignore).
- Gas reporter is always enabled and writes to gas-report.txt.

## Common commands

- Compile
```sh
npx hardhat compile
```

- Run a local node
```sh
npx hardhat node
```

- Deploy to localhost
```sh
npx hardhat run [scripts/deploy.js](scripts/deploy.js) --network localhost
```

- Deploy to Sepolia
```sh
npx hardhat run [scripts/deploy.js](scripts/deploy.js) --network sepolia
```

- Verify on Etherscan (Sepolia)
```sh
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS> [constructor args...]
```

- Run tests
```sh
npx hardhat test
```

- Run coverage (HTML report in [coverage/index.html](coverage/index.html))
```sh
npx hardhat coverage
```

- Run custom task (prints current block number)
```sh
npx hardhat block-number --network sepolia
```

## Gas usage

- Gas reporter is configured in [hardhat.config.js](hardhat.config.js) with:
  - currency: USD (CoinMarketCap)
  - token: MATIC (for unit pricing)
  - output: gas-report.txt
- Run compile/tests to regenerate [gas-report.txt](gas-report.txt).

## Networks

Configured in [hardhat.config.js](hardhat.config.js):
- Hardhat (in-memory, default)
- Localhost: http://localhost:8545, chainId 31337
- Sepolia: chainId 11155111, uses env RPC and account

## Coverage

- After running `npx hardhat coverage`, open [coverage/index.html](coverage/index.html) for the detailed report.
- Summary files: [coverage/lcov.info](coverage/lcov.info), [coverage/coverage-final.json](coverage/coverage-final.json).

## Troubleshooting

- “invalid account” on deploy: ensure SEPOLIA_PRIVATE_KEY is set with 0x prefix and has Sepolia ETH.
- Verification fails: confirm correct constructor args and ETHERSCAN_API_KEY.
- RPC errors: check SEPOLIA_RPC_URL and provider status.

## License

ISC. See [package.json](package.json).