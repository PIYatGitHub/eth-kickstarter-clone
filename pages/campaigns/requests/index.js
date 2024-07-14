import React, { Component } from "react"
import Layout from "../../../components/layout"
import { Button, Table } from "semantic-ui-react"
import { Link } from "../../../routes"
import getCampaignById from "../../../etherium/campaign"

class RequestsIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query
        const campaign = getCampaignById(address)
        const requestsCount = await campaign.methods.getRequestsCount().call()
        let requests = await Promise.all(
            Array(requestsCount).fill().map((element, idx) => {
                return campaign.methods.requests(idx).call()
            })
        )

        console.log("resolved requests for len =", requestsCount, requests)

        return { address, requestsCount, requests }
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table
        return (<Layout>

            <h3>Pending Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`} legacyBehavior>
                <a>
                    <Button primary disabled={!this.props.address}>
                        Add request
                    </Button>
                </a>
            </Link>

            <Table>
                <Header>
                    <Row>
                        <HeaderCell>Id</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recepient</HeaderCell>
                        <HeaderCell>ApprovalCount</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
            </Table>
        </Layout>)
    }
}

export default RequestsIndex