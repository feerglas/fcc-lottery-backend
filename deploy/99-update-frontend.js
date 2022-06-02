const { ethers, network } = require('hardhat');
const fs = require('fs');

const FRONTEND_ADDRESSES_FILE =
  '../fcc-lottery-frontend/constants/contractAddresses.json';
const FRONTEND_ABI_FILE = '../fcc-lottery-frontend/constants/abi.json';

const updateContractAddresses = async () => {
  const raffle = await ethers.getContract('Raffle');
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_FILE, 'utf8')
  );
  const chainId = network.config.chainId.toString();
  network.config.chainId.toString();
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(raffle.address)) {
      currentAddresses[chainId].push(raffle.address);
    }
  } else {
    currentAddresses[chainId] = [raffle.address];
  }

  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));
};

const updateAbi = async () => {
  const raffle = await ethers.getContract('Raffle');
  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    raffle.interface.format(ethers.utils.FormatTypes.json)
  );
};

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND) {
    console.log('Updating frontend...');

    updateContractAddresses();
    updateAbi();

    console.log('---------------------');
  }
};

module.exports.tags = ['all', 'frontend'];
