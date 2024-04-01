// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StellarToken.sol";

contract StakingStellar is Ownable {
    StellarToken public _stellarToken;
    uint256 public totalStakedAmount;
    uint256 private APR = 32;
    mapping(address => StakerInfo) private _stakers;

    struct StakerInfo {
        uint256 startTime;
        uint256 stakedTokens;
        bool isCurrentlyStaking;
    }

    event TokensStaked(address indexed staker, uint256 amount);
    event TokensUnstaked(
        address indexed staker,
        uint256 amount,
        uint256 rewards
    );

    constructor() Ownable(msg.sender) {
        _stellarToken = new StellarToken();
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0.");
        require(
            _stakers[msg.sender].isCurrentlyStaking == false,
            "Already staking. Please unstake before staking again."
        );

        _stellarToken.transferFrom(msg.sender, address(this), amount);

        _stakers[msg.sender] = StakerInfo({
            startTime: block.timestamp,
            stakedTokens: amount,
            isCurrentlyStaking: true
        });

        totalStakedAmount += amount;

        emit TokensStaked(msg.sender, amount);
    }

    function withdraw() external {
        StakerInfo storage staker = _stakers[msg.sender];
        require(staker.isCurrentlyStaking, "No tokens to unstake.");

        uint256 rewards = calculateRewards(msg.sender);
        _stellarToken.transfer(msg.sender, staker.stakedTokens + rewards);

        totalStakedAmount -= staker.stakedTokens;

        emit TokensUnstaked(msg.sender, staker.stakedTokens, rewards);

        delete _stakers[msg.sender];
    }

    function calculateRewards(
        address stakerAddress
    ) public view returns (uint256) {
        StakerInfo memory staker = _stakers[stakerAddress];
        uint256 stakingDurationInSeconds = block.timestamp - staker.startTime;
        uint256 rewards = (staker.stakedTokens *
            stakingDurationInSeconds *
            APR) / (365 days * 100);
        return rewards;
    }

    // Getter functions for contract testing and interaction
    function getStakerInfo(
        address stakerAddress
    ) external view returns (StakerInfo memory) {
        return _stakers[stakerAddress];
    }

    function stakingTokenAddress() external view returns (address) {
        return address(_stellarToken);
    }
}
