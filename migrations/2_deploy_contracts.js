const fs = require('fs');
const assert = require('assert');

const ExitToken = artifacts.require('ExitToken');
const Reward = artifacts.require('Reward');
const RewardProxy = artifacts.require('RewardProxy');
const SoftETHToken = artifacts.require('SoftETHToken');

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

module.exports = async (deployer, network, accounts) => {
    await deployer;

    const STAKEUSD = process.env.STAKEUSD;
    assert(STAKEUSD > 0);

    const admin = accounts[0];
    const staker = accounts[1];
    const currencyRateChanger = accounts[1];
    assert(admin && admin != ZERO_ADDRESS);
    assert(staker && staker != ZERO_ADDRESS);
    assert(currencyRateChanger && currencyRateChanger != ZERO_ADDRESS);
    assert(admin.toLowerCase() != staker.toLowerCase());
    assert(admin.toLowerCase() != currencyRateChanger.toLowerCase());

    const rewardLogic = await deployer.deploy(Reward);
    const rewardProxy = await deployer.deploy(RewardProxy, rewardLogic.address);
    assert((await rewardProxy.admin.call()) === admin);
    assert((await rewardProxy.implementation.call()) === rewardLogic.address);

    const exitToken = await deployer.deploy(ExitToken, rewardProxy.address);
    assert((await exitToken.isMinter.call(rewardProxy.address)) === true);
    assert((await exitToken.isMinter.call(admin)) === false);

    const softETHToken = await deployer.deploy(SoftETHToken, rewardProxy.address);
    assert((await softETHToken.isMinter.call(rewardProxy.address)) === true);
    assert((await softETHToken.isMinter.call(admin)) === false);

    const rewardContract = await Reward.at(rewardProxy.address);
    await rewardContract.initialize(
        staker,
        currencyRateChanger,
        exitToken.address,
        softETHToken.address,
        {from: staker}
    );
    assert((await rewardContract.staker.call({from: staker})) === staker);
    assert((await rewardContract.currencyRateChanger.call({from: staker})) === currencyRateChanger);
    assert((await rewardContract.exitToken.call({from: staker})) === exitToken.address);
    assert((await rewardContract.softETHToken.call({from: staker})) === softETHToken.address);

    await rewardContract.setSTAKEUSD(STAKEUSD, {from: currencyRateChanger});
    assert((await rewardContract.stakeUsd.call({from: currencyRateChanger})) == STAKEUSD);

    const addresses = {
        "ADMIN": admin,
        "CURRENCY_RATE_CHANGER": currencyRateChanger,
        "STAKER": staker,
        "REWARD_IMPLEMENTATION": rewardLogic.address,
        "REWARD_PROXY": rewardProxy.address,
        "EXIT_TOKEN": exitToken.address,
        "SOFT_ETH_TOKEN": softETHToken.address
    };
    fs.writeFileSync(`./addresses.${network}.json`, JSON.stringify(addresses, null, 2));
}

// To test the deployment, run
//   node_modules/.bin/ganache-cli --gasLimit 10000000 --gasPrice 5000000000 --port 8544 --accounts 10 --defaultBalanceEther 1000000
// and then in a separate console run `env STAKEUSD=1000 npm run deploy`.

// To deploy on Mainnet, run `env STAKEUSD=1000 npm run deploy -- --network mainnet`.
