const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');

BASE_FEE = ethers.utils.parseEther('0.25'); // premium. costs 0.25 LINK per request
GAS_PRICE_LINK = 1e9; // link per gas. calculated value based on the gas price of the chain

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (developmentChains.includes(network.name)) {
    log('Local network detected. Deploying Mocks....');
    await deploy('VRFCoordinatorV2Mock', {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    });
    log('Mocks deployed!');
    log('---------------------------------------------');
  }
};

module.exports.tags = ['all', 'mocks'];
