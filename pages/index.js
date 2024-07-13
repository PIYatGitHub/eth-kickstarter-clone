import React, { Component } from "react"
import factory from "../etherium/campaign-factory"

class CampaignIndex extends Component {
    async componentDidMount() {
        const deployedCampaigns = await factory.methods.getDeployedCapmpaigns().call()
        console.log("DC = ", deployedCampaigns)
    }

    render() {
        <p>TTTTT</p>
    }
}

export default CampaignIndex