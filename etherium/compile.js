const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// 1. Delete build directory entirely
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// 2. Read in Campaign.sol
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
try {
    const src = fs.readFileSync(campaignPath, 'utf-8');

    // 3. Prepare input for the Solidity compiler
    const input = {
        language: 'Solidity',
        sources: {
            'Campaign.sol': {
                content: src,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode.object'],
                },
            },
        },
    };

    // 4. Compile the contract
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    // Check for compilation errors
    if (output.errors) {
        output.errors.forEach((err) => {
            console.error(err.formattedMessage);
        });
        throw new Error('Compilation failed');
    }

    // Make sure the build directory exists
    fs.ensureDirSync(buildPath);

    // 5. Write the output to the build directory
    for (const contractName in output.contracts['Campaign.sol']) {
        const contract = output.contracts['Campaign.sol'][contractName];
        fs.outputJsonSync(
            path.resolve(buildPath, `${contractName}.json`),
            contract
        );
    }

} catch (error) {
    console.log('Error when dealing with the file: ', error);
}
