import React, { Component } from "react"
import factory from "../etherium/campaign-factory"
import { Button, Card } from "semantic-ui-react"
import Layout from "../components/layout"

class CampaignIndex extends Component {
    static async getInitialProps() {
        const deployedCampaigns = await factory.methods.getDeployedCapmpaigns().call()
        console.log("DC = ", deployedCampaigns)

        return {
            campaigns: deployedCampaigns.length > 0 ? deployedCampaigns : ["0xeE1b01000F075f8677eBBF1cD52903735e11111"]
        }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>Details</a>,
                fluid: true
            }
        })

        console.log('items....', items)

        return <Card.Group items={items} />
    }

    render() {
        return <Layout>
            <div>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
                <h3>Open campaigns</h3>
                {this.renderCampaigns()}
                <Button
                    content="Add new campaign"
                    icon="add circle"
                    primary
                />
            </div>
        </Layout>

    }
}

export default CampaignIndex