// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StellarToken.sol";

/**
 * @title A contract to stake your Stellar Tokens on StellarYield
 * @author Compote0
 * @dev This contract uses SafeERC20 for token transfers and implements reentrancy guards for security.
 * @notice Manages the staking of Stellar Tokens, allowing users to stake, withdraw, and claim rewards.
 */

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
    /**
     * @notice Initializes the contract with a specific staking token.
     * @dev Sets the staking token address and initializes state variables.
     * @param _stakingToken The ERC20 token to be staked.
     */
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

    /**
     * @notice Get details of a user's staking information.
     * @param user Address of the user to query.
     * @return stakedAmount Amount of tokens the user has staked.
     * @return pendingRewards Rewards not yet claimed by the user.
     * @return unlockTime When the user can withdraw their staked tokens.
     */
    function getUserDetails(
        address user
    )
        external
        view
        returns (
            uint256 stakedAmount,
            uint256 pendingRewards,
            uint256 unlockTime
        )
    {
        stakedAmount = stakedTokens[user];
        pendingRewards = earned(user);
        unlockTime = unlockTimes[user];
    }

    /**
     * @notice Calculate the last timestamp reward applicable.
     * @dev Determines the last timestamp when rewards can be applied, based on the periodFinish.
     * @return The latest applicable timestamp for rewards.
     */
    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }

    /**
     * @notice Calculates the reward per token staked.
     * @dev Calculation includes totalStakedAmount and the reward rate over time.
     * @return Amount of reward per token staked.
     */
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

    /**
     * @notice Calculates the total earned rewards for an account.
     * @param account The address of the account to calculate rewards for.
     * @return Total rewards earned by the account.
     */
    function earned(address account) public view returns (uint256) {
        return
            ((stakedTokens[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }

    /**
     * @notice Allows a user to stake a specified amount of tokens.
     * @dev Transfers tokens to the contract for staking and updates user balances.
     * @param amount Amount of tokens the user wishes to stake.
     */
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

    /**
     * @notice Allows a user to withdraw staked tokens after a lock period.
     * @dev Checks if the user has enough staked tokens and if the unlock time has passed.
     * @param amount Amount of tokens the user wishes to withdraw.
     */
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

    /**
     * @notice Claims all pending rewards for the caller.
     * @dev Transfers the reward tokens to the caller, resetting their reward balance.
     */
    function getReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            stellarToken.safeTransfer(msg.sender, reward);

            emit RewardPaid(msg.sender, reward);
        }
    }

    /**
     * @notice Notifies the contract of the reward amount provided by the owner.
     * @dev Calculates the new reward rate based on the duration and ensures it doesn't exceed the balance.
     * @param reward The amount of tokens to be distributed as rewards.
     */
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

    /**
     * @notice Updates the rewards duration for new periods.
     * @dev Can only be called by the owner and after the current period has ended.
     * @param _rewardsDuration New duration in seconds for distributing rewards.
     */
    function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner {
        require(
            block.timestamp > periodFinish,
            "Previous rewards period must be complete before changing the duration for the new period"
        );
        rewardsDuration = _rewardsDuration;

        emit RewardsDurationUpdated(rewardsDuration);
    }
}
