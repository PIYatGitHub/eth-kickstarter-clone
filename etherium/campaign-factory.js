import web3 from './web3'
const compiledFactory = require("./build/CampaignFactory.json")
require('dotenv').config({ path: "../.env" })

const address = process.env.CAMPAIGN_FACTORY_ADDRESS
// we now need a local instance of this contract
// eslint-disable-next-line import/no-anonymous-default-export
export default new web3.eth.Contract(compiledFactory.abi, address)