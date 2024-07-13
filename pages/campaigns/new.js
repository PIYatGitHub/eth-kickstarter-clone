import React, { Component } from "react"
import Layout from "../../components/layout"
import { Button, Form, Input, Message } from "semantic-ui-react"
import campaignFactory from "../../etherium/campaign-factory"
import web3 from "../../etherium/web3"

class CampaignNew extends Component {
    state = {
        minimumContribution: '1000000',
        requestError: "",
        requestLoading: false
    }

    onSubmit = async (e) => {
        e.preventDefault()
        this.setState({ requestLoading: true })
        console.log("Submitting that form")
        console.log("Submitting with this amount of Wei", this.state.minimumContribution)
        try {
            const accounts = await web3.eth.getAccounts()
            await campaignFactory.methods.createCampaign(
                this.state.minimumContribution
            ).send({
                from: accounts[0]
            })
        } catch (error) {
            this.setState({ requestError: "Ooops something went worng. Please try again later!" })
            setTimeout(() => {
                this.setState({ requestError: "" })
            }, 3500)
        } finally {
            this.setState({ requestLoading: false })
        }

    }

    render() {
        return (<Layout>
            <h2>Let's go make something great!</h2>

            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Minimum contribution (in Wei) 10 000 000 000 000 000 wei = $3.15</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        icon="money"
                        iconPosition="left"
                        type="number"
                        min={1000000}
                        max={1000000000000000}
                        step={100000}
                        defaultValue={1000000}
                        value={Number(this.state.minimumContribution)}
                        onChange={(e) => this.setState({ minimumContribution: e.target.value })}
                    />

                </Form.Field>

                <Button primary disabled={this.state.requestError !== ""} loading={this.state.requestLoading}>Create!</Button>
                {this.state.requestError !== "" ? (
                    <Message negative header="Error!" content={this.state.requestError} />
                ) : null}
            </Form>
        </Layout>)
    }
}

export default CampaignNew