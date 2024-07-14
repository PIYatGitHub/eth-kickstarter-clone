import web3 from './web3'
const compiledCampaign = require("./build/Campaign.json")
require('dotenv').config({ path: "../.env" })

function getCampaignById(address) {
    return new web3.eth.Contract(compiledCampaign.abi, address)
}

export default getCampaignById