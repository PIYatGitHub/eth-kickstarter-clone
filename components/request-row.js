import React, { Component } from "react"
import { Button, Table } from "semantic-ui-react"
import web3 from "../etherium/web3"
import getCampaignById from "../etherium/campaign"

class RequestRow extends Component {
    state = {
        requestError: '',
        requestLoading: false
    }

    onApprove = async () => {
        try {
            const accounts = await web3.eth.getAccounts()
            const campaign = getCampaignById(this.props.address)

            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch (error) {
            this.setState({ requestError: "Ooops something went worng. Please try again later!" + error.message })
            setTimeout(() => {
                this.setState({ requestError: "" })
            }, 2500)
        } finally {
            this.setState({ requestLoading: false })
        }
    }


    onFinalize = async () => {
        try {
            const accounts = await web3.eth.getAccounts()
            const campaign = getCampaignById(this.props.address)

            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch (error) {
            this.setState({ requestError: "Ooops something went worng. Please try again later!" + error.message })
            setTimeout(() => {
                this.setState({ requestError: "" })
            }, 2500)
        } finally {
            this.setState({ requestLoading: false })
        }
    }

    render() {
        const { Row, Cell } = Table
        const { id, request, approvers } = this.props
        const { description, value, recepient, approvalsCount } = request
        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
                <Cell>{recepient}</Cell>
                <Cell>{approvalsCount} / {approvers}</Cell>
                <Cell>
                    <Button color="green" basic onClick={this.onApprove} loading={this.state.requestLoading}>
                        Approve
                    </Button>
                </Cell>
                <Cell>
                    <Button color="red" basic onClick={this.onFinalize} loading={this.state.requestLoading}>
                        Finalize
                    </Button>
                </Cell>
            </Row>
        )
    }
}

export default RequestRow