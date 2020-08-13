pragma solidity ^0.5.0;


contract IMinionNFTMinter {
    function mint(to: address, tokenId: uint256) public returns (bool)
    function mintWithTokenURI(to: address, tokenId: uint256, tokenURI: string) public returns (bool)
    function registerNFT(nft: address) public returns (bool)
    function deregisterNFT(nft: address) public returns (bool)
}