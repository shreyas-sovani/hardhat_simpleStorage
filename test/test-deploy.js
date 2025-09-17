const { ethers } = require("hardhat");
const {expect, asserts, assert} = require("chai");

describe("SimpleStorage", function(){
    let SimpleStorageFactory, simpleStorage;
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy();       
    })

    it("Should start with a fav number 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";

        assert.equal(currentValue.toString(), expectedValue)
        
    })

    it("Should update when we call store function", async function () {
        await simpleStorage.store(69);
        const updatedValue = await simpleStorage.retrieve();
        const expectedValue = "69";

        assert.equal(updatedValue.toString(),expectedValue)
    })

    it("Should add person", async function () {

        await simpleStorage.addPerson("Shreyas",69);
        const currentValue = await simpleStorage.getPeople();
        const expectedValue = [[69n,"Shreyas"]];

        assert.deepEqual(currentValue, expectedValue);
        
    })

    
})