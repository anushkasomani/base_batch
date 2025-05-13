// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Pausable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DynamicNFT is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Pausable,
    Ownable
{
    uint256 private _nextTokenId;

    // user => tokenId => uri
    mapping(address => mapping(uint256 => string)) public userTokenURI;

    // tokenId => owner (for easy querying)
    mapping(uint256 => address) public tokenIdToMinter;

    event Minted(address indexed user, uint256 indexed tokenId, string uid);

    constructor(address initialOwner)
        ERC721("BaseHackathonProject", "BHP")
        Ownable(initialOwner)
    {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @notice Anyone can mint. The minter address is mapped to the tokenId and their UID.
     */
    function safeMint(string memory uri)
        public
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        userTokenURI[msg.sender][tokenId] = uri;
        tokenIdToMinter[tokenId] = msg.sender;
        emit Minted(msg.sender, tokenId, uri);
        return tokenId;
    }

    /**
     * @notice Only the NFT owner or the mapped user can update the URI.
     */
    function updateTokenURI(uint256 tokenId, string memory newTokenURI)
        public
    {
        require(
            tokenIdToMinter[tokenId] == msg.sender,
            "Not authorized"
        );
        _setTokenURI(tokenId, newTokenURI);
    }

    function showTokenURI(uint256 tokenId) public view returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @notice Get the UID for a given user and tokenId.
     */
    function getUserURI(address user, uint256 tokenId) public view returns (string memory) {
        return userTokenURI[user][tokenId];
    }

    /**
     * @notice Get the minter (user) for a given tokenId.
     */
    function getMinter(uint256 tokenId) public view returns (address) {
        return tokenIdToMinter[tokenId];
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}