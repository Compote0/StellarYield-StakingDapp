// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

error StakingTransferFailed();
error UnstakeTransferFailed();
error StakingMustBeMoreThanZero();

contract Staking is Ownable, ReentrancyGuard {

    struct StakingInfos {
        uint amount;
        bool hasStaked;
        uint dateStart;
    }

    mapping (address => StakingInfos) public stakingInfos;
    uint public totalStaker;
    uint public totalStaked;
    uint public stakingRate = 32;
    
    event Stake(address account, uint amount);
    event Unstake(address account, uint amount, uint rewards);

    constructor() Ownable(msg.sender) {
    }

    function getStaked(address _account) public view returns (uint) {
    }


    function stake(uint _amount) external {
    }

    function unstake(uint _amount) external {
    }

    function earned(address _account) public view returns (uint256) {
    }

    function getRewards(uint _amount) public view returns (uint) {
    }

}
