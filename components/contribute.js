import React, { Component } from "react"
import { Button, Form, Input, Message } from "semantic-ui-react"
import getCampaignById from "../etherium/campaign"
import web3 from "../etherium/web3"
import { Router } from "../routes"

class ContributeForm extends Component {
    state = {
        pledge: '',
        requestError: '',
        requestLoading: false
    }


    onSubmit = async (e) => {
        e.preventDefault()
        this.setState({ requestLoading: true })
        try {
            const accounts = await web3.eth.getAccounts()
            console.log('getting a campaign at address...', this.props.address)
            const campaign = getCampaignById(this.props.address)
            await campaign.methods.contribute(this.state.pledge).send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.pledge, 'ether')
            })
        } catch (error) {
            this.setState({ requestError: "Ooops something went worng. Please try again later!" })
            setTimeout(() => {
                this.setState({ requestError: "" })
            }, 2500)
        } finally {
            this.setState({ requestLoading: false })
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        }
    }


    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        label="ETH"
                        labelPosition="right"
                        onChange={(e) => this.setState({ pledge: e.target.value })}
                    />
                </Form.Field>
                <Button primary loading={this.state.requestLoading} disabled={this.state.requestError !== ""}>
                    Contribute!
                </Button>
                {this.state.requestError !== "" ? (
                    <Message negative header="Error!" content={this.state.requestError} />
                ) : null}
            </Form>
        )
    }
}

export default ContributeForm