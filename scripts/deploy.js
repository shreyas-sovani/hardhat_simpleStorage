const { ethers, run,network } = require("hardhat");

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying SimpleStorage...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();
    console.log("SimpleStorage deployed to:", simpleStorage.target);

    if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
        await verify(simpleStorage.target, []);
    }

    
    // Interact with the contract
    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);

    const transactionValue = await simpleStorage.store(7);
    await transactionValue.wait();
    console.log("Value Updated!");

    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);

}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try{
        await run("verify:verify",{
            address : contractAddress,
            constructorArguments: args,
        })
    }catch(e){
        if(e.message.toLowerCase().includes("already verified")){
            console.log("Already Verified!");
        }else{
            console.log(e);
        }
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });