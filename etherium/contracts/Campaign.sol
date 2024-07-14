// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 pledge) public payable {
        Campaign newContract = new Campaign(pledge, msg.sender); // Change this line
        deployedCampaigns.push(address(newContract)); // And this one
    }

    function getDeployedCapmpaigns() public view returns (address[] memory) {
        return deployedCampaigns; 
    }
}

contract Campaign {
    struct Request {
        // this is just a definition, like a blueprint of sorts.
        string description;
        uint256 value;
        address payable recepient;
        bool complete;
        uint256 approvalsCount;
        mapping(address => bool) approvals; // these ppl have provided approval to the spending request!
    }

    uint256 public approversCount;
    address public manager;
    uint256 public minimumContribution;
    Request[] public requests; // what spending requests do we have? for example: "spend $100 on gas for sales presentations"
    mapping(address => bool) public approvers; // these will control the approval of a request to spend money

    constructor(uint256 pledge, address creator) {
        manager = creator; // use this here since we make it with a factory and not with an account
        minimumContribution = pledge; // how much must the backer pledge to get the perk? Example: 0.01 ether
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution); // ensure we have the minimum amount settled!
        approvers[msg.sender] = true;
        approversCount++;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier isConstributor() {
        require(approvers[msg.sender]);
        _;
    }

    function createRequest(
        string calldata description,
        uint256 value,
        address payable recepient
    ) public restricted {
        Request storage newRequest = requests.push(); // Create a new Request object in storage
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recepient = recepient;
        newRequest.complete = false;
        newRequest.approvalsCount = 0;
    }

    function approveRequest(uint256 index) public isConstributor {
        Request storage targetRequest = requests[index];
        require(!targetRequest.approvals[msg.sender]);
        targetRequest.approvals[msg.sender] = true;
        targetRequest.approvalsCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage targetRequest = requests[index];

        require(!targetRequest.complete);
        require(targetRequest.approvalsCount > (approversCount / 2)); // iif we have 50 ppl, then at least 26 must approve

        targetRequest.recepient.transfer(targetRequest.value);
        targetRequest.complete = true;
    }

    function getSummary() public view returns(
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution, 
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint) {
        return requests.length;
    }
}
