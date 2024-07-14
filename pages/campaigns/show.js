import React, { Component } from "react"
import Layout from "../../components/layout"
import { Button, Form, Input, Message } from "semantic-ui-react"
import campaignFactory from "../../etherium/campaign-factory"
import web3 from "../../etherium/web3"
import { Router } from "../../routes"
import getCampaignById from "../../etherium/campaign"

class CampaignShow extends Component {
    state = {}
    static async getInitialProps(props) {
        const address = props.query.address //which campaign are we interested in...
        console.log('address is...', address)
        const campaign = getCampaignById(address)
        const data = await campaign.methods.getSummary().call()
        console.log('data', data)

        return {
            minimumContribution: data[0],
            campaignBalance: data[1],
            requestsCount: data[2],
            approversCount: data[3],
            manager: data[4],
        }
    }


    render() {
        return (<Layout>

            <h2>Campaign details!</h2>

        </Layout>)
    }
}

export default CampaignShow