// // compile code will go here
// const path = require('path');
// const fs = require('fs');
// const solc = require('solc');

// const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// const src = fs.readFileSync(inboxPath, 'utf8');

// const compileResult = solc.compile(src, 1);

// console.log(src)

// console.log("compiled: ")
// console.log(compileResult)
// console.log("compiled: ")

const path = require('path')
const fs = require('fs')
const solc = require('solc')

// Path to your Solidity contract
const filePath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const source = fs.readFileSync(filePath, 'utf8')

// Set up the input structure for the Solidity compiler
const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
}

// Callback function for reading files (not used in this case, but required)
const findImports = (importPath) => {
    try {
        const filePath = path.resolve(__dirname, 'contracts', importPath)
        const content = fs.readFileSync(filePath, 'utf8')
        return { contents: content }
    } catch (error) {
        return { error: 'File not found' }
    }
}

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }))
console.log(output.contracts['Campaign.sol'].Campaign)

// Export the ABI and bytecode
module.exports = output.contracts['Campaign.sol'].Campaign
