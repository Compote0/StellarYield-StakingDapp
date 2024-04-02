// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StellarToken.sol";

contract StakingStellar is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public stellarToken;

    /* ::::::::::::::::::: VARIABLES ::::::::::::::::::: */

    uint256 public totalStakedAmount;
    uint256 public rewardRate;
    uint256 public periodFinish = 0;
    uint256 public rewardsDuration = 7 days;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public stakedTokens;
    mapping(address => uint256) public unlockTimes;

    /* ::::::::::::::::::: EVENTS ::::::::::::::::::: */

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardsDurationUpdated(uint256 newDuration);
    event RewardAdded(uint256 reward);

    /* ::::::::::::::::::: CONSTRUCTOR  ::::::::::::::::::: */

    constructor(address _stakingToken) Ownable(msg.sender) {
        stellarToken = IERC20(_stakingToken);
    }

    /* ::::::::::::::::::: MODIFIER  ::::::::::::::::::: */

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    /* ::::::::::::::::::: FUNCTIONS ::::::::::::::::::: */

    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStakedAmount == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            ((rewardRate *
                (lastTimeRewardApplicable() - lastUpdateTime) *
                1e18) / totalStakedAmount);
    }

    function earned(address account) public view returns (uint256) {
        return
            ((stakedTokens[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }

    function stake(
        uint256 amount
    ) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than 0");
        totalStakedAmount += amount;
        stakedTokens[msg.sender] += amount;
        unlockTimes[msg.sender] = block.timestamp + 1 weeks;
        stellarToken.safeTransferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function withdraw(
        uint256 amount
    ) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");
        require(
            stakedTokens[msg.sender] >= amount,
            "Withdrawal amount exceeds balance"
        );
        require(
            block.timestamp >= unlockTimes[msg.sender],
            "Tokens are still locked"
        );
        totalStakedAmount -= amount;
        stakedTokens[msg.sender] -= amount;
        stellarToken.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            stellarToken.safeTransfer(msg.sender, reward);

            emit RewardPaid(msg.sender, reward);
        }
    }

    function notifyRewardAmount(
        uint256 reward
    ) external onlyOwner updateReward(address(0)) {
        if (block.timestamp >= periodFinish) {
            rewardRate = reward / rewardsDuration;
        } else {
            uint256 remaining = periodFinish - block.timestamp;
            uint256 leftover = remaining * rewardRate;
            rewardRate = (reward + leftover) / rewardsDuration;
        }
        uint256 balance = stellarToken.balanceOf(address(this));
        require(
            rewardRate <= balance / rewardsDuration,
            "Provided reward too high"
        );
        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp + rewardsDuration;

        emit RewardAdded(reward);
    }

    function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner {
        require(
            block.timestamp > periodFinish,
            "Previous rewards period must be complete before changing the duration for the new period"
        );
        rewardsDuration = _rewardsDuration;

        emit RewardsDurationUpdated(rewardsDuration);
    }
}
