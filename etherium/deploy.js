const HDWalletProvider = require('@truffle/hdwallet-provider')
const { Web3 } = require('web3')
const compiledFactory = require("./build/CampaignFactory.json")
require('dotenv').config({ path: "../.env" })


console.log("process.env.INFURA_API_KEY ", process.env.INFURA_API_KEY)

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    'https://sepolia.infura.io/v3/' + process.env.INFURA_API_KEY
)


const web3 = new Web3(provider)

async function deploy() {
    const accounts = await web3.eth.getAccounts()
    const selectedAccount = accounts.at(0)

    console.log("Attempting to deploy with account: ", selectedAccount)

    //deploy the contract to one of them 
    const resultInstance = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: selectedAccount, gas: '1000000' })

    console.log("This contract just got deployed to this address!", JSON.stringify(compiledFactory.abi))
    console.log("This contract just got deployed to this address!", resultInstance.options.address)
}

// we made this so we can use the async/await! 
deploy() 