// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StellarToken is ERC20, Ownable, ReentrancyGuard {
    uint8 constant _decimals = 18;
    uint256 constant _initialSupply = 1000 * (10 ** 6) * 10 ** _decimals;

    constructor() ERC20("Stellar Yield Token", "STELLAR") Ownable(msg.sender) {
        _mint(msg.sender, _initialSupply);
    }

    function faucet() external {
        _mint(msg.sender, 10 * 10 ** _decimals);
    }
}
