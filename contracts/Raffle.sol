// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error Raffle_NotEnoughETHEntered();

contract Raffle {
  // State variables
  uint256 private immutable i_entranceFee;
  address payable[] private s_players;

  constructor(uint256 _entranceFee) {
    i_entranceFee = _entranceFee;
  }

  function enterRaffle() public payable {
    if (msg.value < i_entranceFee) {
      revert Raffle_NotEnoughETHEntered();
    }

    s_players.push(payable(msg.sender));
  }

  // function pickRandomWinner() {}

  function getEntranceFee() public view returns (uint256) {
    return i_entranceFee;
  }

  function getPlayer(uint256 _index) public view returns (address) {
    return s_players[_index];
  }
}
