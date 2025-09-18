const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {

    //  get the current network name
    const network = hre.network.name;
    const chainId = hre.network.config.chainId;
    const deploymentDir = `chain-${chainId}`;
    console.log("Network:", network);

    //path to ignition deployments artifacts
    const deploymentPath = path.join(
        __dirname, 
        "..", 
        "ignition", 
        "deployments", 
        deploymentDir, 
        "deployed_addresses.json");
        
    //read the deployment file
    const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
    console.log("Deployment:", deployment);
    
    // get the deployed contract address
    const address = deployment["SimpleStorageModule#SimpleStorage"];

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