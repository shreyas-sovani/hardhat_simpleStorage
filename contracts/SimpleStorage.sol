// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStorage{
    uint256 favouriteNumber;

    mapping (string=>uint256) public nameToFavouriteNumber;

    People[] public people;
    
    struct People{
        uint256 favouriteNumber;
        string name;
    }

    function store(uint256 _favouriteNumber) public virtual  {
        favouriteNumber = _favouriteNumber;
    }

    function retrieve() public view returns(uint256) {
        return favouriteNumber;
    }

    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        people.push(People(_favouriteNumber, _name));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }

    function getPeople() public view returns(People[] memory){
        return people;
    }

} 

