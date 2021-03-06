const fs = require('fs');
const assert = require('assert');
const HDWalletProvider = require("@truffle/hdwallet-provider");

function getPrivateKeys() {
  let privateKeys = fs.readFileSync(`${__dirname}/keys`, 'utf8').trim().split(/\r?\n/);
  privateKeys = privateKeys.map((key) => { return key.trim() });
  assert(privateKeys.length === 2);
  return privateKeys;
}

module.exports = {
  networks: {
    coverage: {
      host: "127.0.0.1",
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      network_id: "*"
    },
    development: {
      host: "127.0.0.1",
      port: 8544,
      network_id: "*",
      gasPrice: 5000000000
    },
    kovan: {
      provider: () => {
        const privateKeys = getPrivateKeys();
        return new HDWalletProvider(
          privateKeys,
          "https://kovan.infura.io/v3/1125fe73d87c4e5396678f4e3089b3dd",
          0,
          privateKeys.length
        )
      },
      network_id: 42,
      gasPrice: 5000000000,
      skipDryRun: true
    },
    mainnet: {
      provider: () => {
        const privateKeys = getPrivateKeys();
        return new HDWalletProvider(
          privateKeys,
          "https://mainnet.infura.io/v3/1125fe73d87c4e5396678f4e3089b3dd",
          0,
          privateKeys.length
        )
      },
      network_id: 1,
      gasPrice: 5000000000,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.5.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  }
}
