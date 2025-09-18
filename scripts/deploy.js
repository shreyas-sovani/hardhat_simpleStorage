const hre = require("hardhat");


async function main() {

    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

    // Attach to the deployed contract
    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const simpleStorage = SimpleStorage.attach(address);

    //INTERACT

    const currentValue = await simpleStorage.retrieve();
    console.log("Current Value:", currentValue.toString());

    const storeValue = await simpleStorage.store(7);
    await storeValue.wait();
    console.log("Value Updated!");

    const updatedValue = await simpleStorage.retrieve();
    console.log("Updated Value:", updatedValue.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});