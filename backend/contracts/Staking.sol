// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Staking is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant WEEK = 7 days;
    uint256 private totalStaked;
    uint256 public lockPeriod = 9 days;

    uint256 public apr;
    uint256 public constant MAX_APR = 10;
    uint256 public constant MAX_TOTAL_STAKED = 10000 ether;
    uint256 public constant MIN_APR = 2;
    uint256 public constant BASE_APR= 5;
    
    mapping(address => uint256) public lockTime;
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public lastClaimTime;

    event Staked(address user, uint256 amount, uint256 time);
    event Claimed(address user, uint256 reward);
    event Withdrawn(address user, uint256 amount, uint256 time);

    constructor() ERC20("Staked MATIC", "sMATIC") Ownable(msg.sender) {}
    
    function getTotalStakedBalance() external view returns (uint256) {
        return totalStaked;
    }

    function getUserBalance(address user) external view returns (uint256) {
        return stakedBalances[user];
    }

    function stake() external payable nonReentrant {
        require(msg.value > 0, "Staking amount must be more than zero");
        uint256 amount = msg.value;

        // Mint sMATIC tokens to the staker
        _mint(msg.sender, amount);

        stakedBalances[msg.sender] += amount;
        totalStaked += amount; 
        lastClaimTime[msg.sender] = block.timestamp;
        
        lockTime[msg.sender] = block.timestamp + lockPeriod; // Set lock time

        adjustAPR();

        emit Staked(msg.sender, amount, block.timestamp);
    }

    function claim() external nonReentrant {
        require(stakedBalances[msg.sender] > 0, "No staked MATIC to claim rewards from");
        require(lastClaimTime[msg.sender] + WEEK <= block.timestamp, "Rewards can only be claimed once a week");

        uint256 timeElapsed = block.timestamp - lastClaimTime[msg.sender];
        uint256 reward = calculateReward(stakedBalances[msg.sender], timeElapsed);

        // Mint sMATIC tokens as rewards to the staker
        _mint(msg.sender, reward);
        lastClaimTime[msg.sender] = block.timestamp;

        emit Claimed(msg.sender, reward);
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(amount <= stakedBalances[msg.sender], "Cannot withdraw more than the staked amount");
        require(block.timestamp >= lockTime[msg.sender], "Stake is currently locked");

        stakedBalances[msg.sender] -= amount;
        totalStaked -= amount;

        // Burn sMATIC tokens
        _burn(msg.sender, amount);

        // Send back MATIC to the user
        payable(msg.sender).transfer(amount);

        emit Withdrawn(msg.sender, amount, block.timestamp);
    }

    function adjustAPR() internal {
        if (totalStaked <= MAX_TOTAL_STAKED / 2) {
            // Si le montant total mis en jeu est inférieur à la moitié du max, augmenter l'APR
            apr = BASE_APR + (MAX_APR - BASE_APR) * totalStaked / (MAX_TOTAL_STAKED / 2);
        } else if (totalStaked <= MAX_TOTAL_STAKED) {
            // Si le montant total mis en jeu est entre la moitié et le max, baisser l'APR
            apr = BASE_APR - (BASE_APR - MIN_APR) * (totalStaked - (MAX_TOTAL_STAKED / 2)) / (MAX_TOTAL_STAKED / 2);
        } else {
            // Si le total mis en jeu dépasse le max, APR = MIN_APR
            apr = MIN_APR;
        }
    }


    function calculateReward(uint256 userStakedAmount, uint256 timeStaked) public view returns (uint256) {
        uint256 userStakeShare = userStakedAmount * 1e18 / totalStaked; // User's share of the total stake, multiplied by 1e18

        uint256 adjustedApr = apr;

        // Calculate time factor, rewarding longer staking periods
        uint256 timeFactor = timeStaked / WEEK; // Number of weeks staked
        if (timeFactor > 52) { // Cap the time factor to 1 year to prevent overflow
            timeFactor = 52;
        }

        // Base reward calculation
        uint256 baseReward = userStakedAmount * adjustedApr / 100 / 52; // Divide APR by 52 to get weekly rate

        // Final reward calculation, incorporating user's stake share, base reward, and time factor
        uint256 finalReward = baseReward * userStakeShare / 1e18 * (1 + timeFactor / 52); // Add 1 to timeFactor to ensure reward for staking less than a week

        return finalReward;
    }
}
