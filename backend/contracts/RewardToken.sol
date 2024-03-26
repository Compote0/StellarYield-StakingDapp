// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor() ERC20("Staked MATIC", "sMATIC") Ownable(msg.sender) {}

    /**
     * @dev Mint new sMATIC tokens to a specified address. 
     * Access restricted to the owner of the contract.
     *
     * @param recipient The address to mint tokens to.
     * @param amount The amount of tokens to mint.
     */
    function mint(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount * 10**uint256(decimals()));
    }

    /**
     * @dev Burn sMATIC tokens from a specified address.
     * Access restricted to the owner of the contract.
     *
     * @param from The address to burn tokens from.
     * @param amount The amount of tokens to burn.
     */    
     function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount * 10**decimals());
    }
}
