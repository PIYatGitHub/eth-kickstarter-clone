import React, { Component } from "react"
import Layout from "../../components/layout"
import { Button, Card, Form, Input, Message } from "semantic-ui-react"
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
            minimumContribution: data[0].toString(),
            balance: data[1].toString(),
            requestsCount: data[2].toString(),
            approversCount: data[3].toString(),
            manager: data[4].toString(),
        }
    }


    renderCards() {
        const { minimumContribution, balance, requestsCount, approversCount, manager } = this.props
        console.log('what is in props? ', this.props)
        const items = [
            {
                header: manager,
                meta: "Each campaign has a manager. This is his address.",
                description: "The manager is the one who made this campaign. He can make requests to withdraw money.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution + " [wei]",
                meta: "Each campaign has a minimum contribution to enter and get the perks. It is measured in wei.",
                description: "You must contributer AT LEAST that amount to become a campaign approver.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: "Each campaign can have a number of requests to complete.",
                description: "This controls expenses and is subject to the approval of all backers.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: "Each campaign can have a number of approvers.",
                description: "This is all of you who backed that campaign by a donnation.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Each campaign has a balance. Measured in ETHER",
                description: "This is all the money the campaign has collected.",
                style: { overflowWrap: 'break-word' }
            }
        ]

        return <Card.Group items={items} />
    }


    render() {
        return (<Layout>

            <h2>Campaign details!</h2>
            {this.renderCards()}

        </Layout>)
    }
}

export default CampaignShow