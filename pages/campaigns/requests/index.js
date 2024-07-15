import React, { Component } from "react"
import Layout from "../../../components/layout"
import { Button, Table } from "semantic-ui-react"
import { Link } from "../../../routes"
import getCampaignById from "../../../etherium/campaign"
import RequestRow from "../../../components/request-row"

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

        requests = requests.map(request => ({
            ...request,
            '1': request['1'].toString(),
            '4': request['4'].toString(),
            value: request.value.toString(),
            approvalsCount: request.approvalsCount.toString()
        }))

        console.log('requests.... POST', requests)
        const approvers = await campaign.methods.approversCount().call()
        return { address, requestsCount: requestsCount.toString(), requests, approvers: approvers.toString() }
    }

    renderRows = () => {
        console.log('working with this many requests...', this.props.requests)
        return this.props.requests.map((request, idx) => {
            return (<RequestRow
                key={idx}
                id={idx}
                approvers={this.props.approvers}
                request={request}
                address={this.props.address}
            />)
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table
        return (<Layout>

            <h3>Pending Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`} legacyBehavior>
                <a>
                    <Button primary disabled={!this.props.address} floated="right" style={{ marginBottom: '1rem' }}>
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
                <Body>
                    {this.renderRows()}
                </Body>
            </Table>
            <p>Found <b>{this.props.requestsCount}</b> requests.</p>
        </Layout>)
    }
}

export default RequestsIndex