const assert = require("assert");
const ganache = require("ganache-cli");
const { Web3 } = require("web3") // pay attention to capital and lowercase letters!
const web3 = new Web3(ganache.provider())

const compiledFactory = require("../etherium/build/CampaignFactory.json");
const compiledCampaign = require("../etherium/build/Campaign.json");



let accounts; // a list of all accounts we had
let factory; // a ref to the deployed factory we have
let campaignAddress; // where is the new campaign deployed?
let campaign; // create an instance we can interact with
let manager; // who deployed the contract

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    manager = accounts[0];
    console.log(manager)

    const commonSendParams = {
        from: manager,
        gas: "3000000", // Increased gas limit
        gasPrice: "200000"
    };

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send(commonSendParams);

    console.log("TESTS >> ", "contract deployed at: ", factory.options.address);

    await factory.methods.createCampaign('10000').send(commonSendParams);

    const deployedCampaigns = await factory.methods.getDeployedCapmpaigns().call();
    campaignAddress = deployedCampaigns[0];

    campaign = await new web3.eth.Contract(
        compiledCampaign.abi,
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('can deploy CampaignFactory', () => {
        assert.ok(factory.options.address);
    });
    it('can deploy Campaign', () => {
        assert.ok(campaign.options.address);
    });
});
