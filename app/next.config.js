const fs = require('fs');

const privateKeyFilepath = `${__dirname}/key`;
try {
  fs.rmdirSync(privateKeyFilepath);
} catch (e) {}
const privateKey = fs.existsSync(privateKeyFilepath)
  ? fs.readFileSync(privateKeyFilepath, 'utf8').trim()
  : '';

module.exports = {
  publicRuntimeConfig: {
    rewardContractAddress: '0xf0aC1928cf8a2e29829e78d4C8A40b8Bf5dD4329',
    rewardContractABI: [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newTotalSupply","type":"uint256"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"Rebalanced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"stakingEpoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"exitMintAmount","type":"uint256"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"StakingEpochFinished","type":"event"},{"constant":true,"inputs":[],"name":"COLLATERAL_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"EXIT_MINT_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currencyRateChanger","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethUsd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethUsdCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"exitCurrentSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"exitToken","outputs":[{"internalType":"contract IExitToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_totalStakeAmount","type":"uint256"}],"name":"finishStakingEpoch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentDataBatch","outputs":[{"internalType":"uint256","name":"_ethUsd","type":"uint256"},{"internalType":"uint256","name":"_ethUsdCurrent","type":"uint256"},{"internalType":"uint256","name":"_exitCurrentSupply","type":"uint256"},{"internalType":"uint256","name":"_lastStakingEpochFinished","type":"uint256"},{"internalType":"uint256","name":"_softETHCurrentSupply","type":"uint256"},{"internalType":"uint256","name":"_softETHExpectedSupply","type":"uint256"},{"internalType":"uint256","name":"_stakeUsd","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"address","name":"_currencyRateChanger","type":"address"},{"internalType":"contract IExitToken","name":"_exitToken","type":"address"},{"internalType":"contract ISoftETHToken","name":"_softETHToken","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastStakingEpochFinished","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"rebalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_cents","type":"uint256"}],"name":"setSTAKEUSD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"softETHCurrentSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"softETHExpectedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"softETHToken","outputs":[{"internalType":"contract ISoftETHToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakeUsd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"staker","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"usdEthCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],
    rpcURL: 'https://mainnet.infura.io/v3/1125fe73d87c4e5396678f4e3089b3dd'
  },
  ratioReadInterval: 600,  // 10 minutes (in seconds)
  rebalanceInterval: 3600, // 1 hour (in seconds)
  //ratioReadInterval: 60,  // for testing
  //rebalanceInterval: 120, // for testing
  privateKey, // a private key of an account to send transactions from
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    return config
  }
}
