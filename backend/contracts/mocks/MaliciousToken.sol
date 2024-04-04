// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MaliciousToken is ERC20 {
    address public stakingContract;

    constructor(address _stakingContract) ERC20("MaliciousToken", "MTKN") {
        stakingContract = _stakingContract;
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        super.transfer(recipient, amount);

        // Attempt reentrancy attack on stake function
        if (stakingContract != address(0)) {
            (bool success, ) = stakingContract.call(
                abi.encodeWithSignature("stake(uint256)", amount)
            );
            require(success, "Failed to call stake");
        }

        // Attempt reentrancy attack on withdraw function
        if (stakingContract != address(0)) {
            (bool success, ) = stakingContract.call(
                abi.encodeWithSignature("withdraw(uint256)", amount)
            );
            require(success, "Failed to call withdraw");
        }

        // Attempt reentrancy attack on getReward function
        if (stakingContract != address(0)) {
            (bool success, ) = stakingContract.call(
                abi.encodeWithSignature("getReward()")
            );
            require(success, "Failed to call getReward");
        }

        return true;
    }
}
