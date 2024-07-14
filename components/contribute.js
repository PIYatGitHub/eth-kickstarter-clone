import React, { Component } from "react"
import { Button, Form, Input } from "semantic-ui-react"
import getCampaignById from "../etherium/campaign"


class ContributeForm extends Component {
    state = {
        pledge: '',
        requestError: '',
        requestLoading: false
    }


    onSubmit = async () => {
        e.preventDefault()
        this.setState({ requestLoading: true })
        try {
            const accounts = await web3.eth.getAccounts()
            const campaign = getCampaignById("")
            await campaign.methods.contribute(this.state.pledge).send({
                from: accounts[0]
            })

            Router.pushRoute('/')

        } catch (error) {
            this.setState({ requestError: "Ooops something went worng. Please try again later!" })
            setTimeout(() => {
                this.setState({ requestError: "" })
            }, 2500)
        } finally {
            this.setState({ requestLoading: false })
        }


    }


    render() {
        return (
            <Form>
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
            </Form>
        )
    }
}

export default ContributeForm