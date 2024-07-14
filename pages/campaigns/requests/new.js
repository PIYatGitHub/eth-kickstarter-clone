import React, { Component } from "react"
import Layout from "../../../components/layout"
import { Button, Form, Input, Message } from "semantic-ui-react"
import getCampaignById from "../../../etherium/campaign"
import web3 from "../../../etherium/web3"
import { Router } from "../../../routes"

class RequestForm extends Component {
    state = {
        description: '',
        value: '',
        recepient: '',
        requestError: '',
        requestLoading: false
    }

    static async getInitialProps(props) {
        const { address } = props.query
        return { address }
    }

    onSubmit = async (e) => {
        e.preventDefault()
        this.setState({ requestLoading: true })
        try {
            const accounts = await web3.eth.getAccounts()
            console.log("PROPS???", this.props)
            const campaign = getCampaignById(this.props.address)
            const { description, value, recepient } = this.state

            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recepient
            ).send({
                from: accounts[0]
            })
        } catch (error) {
            this.setState({ requestError: "Ooops something went worng. Please try again later!" + error.message })
            setTimeout(() => {
                this.setState({ requestError: "" })
            }, 2500)
        } finally {
            this.setState({ requestLoading: false })
            Router.pushRoute(`/campaigns/${this.props.address}/requests`)
        }
    }

    render() {
        return (
            <Layout>
                <h3>Create a request</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in ETH</label>
                        <Input
                            value={this.state.value}
                            onChange={(e) => { this.setState({ value: e.target.value }) }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recepient</label>
                        <Input
                            value={this.state.recepient}
                            onChange={(e) => { this.setState({ recepient: e.target.value }) }}
                        />
                    </Form.Field>

                    <Button primary loading={this.state.requestLoading} disabled={this.state.requestError !== ""}>
                        Create!
                    </Button>
                    {this.state.requestError !== "" ? (
                        <Message negative header="Error!" content={this.state.requestError} />
                    ) : null}
                </Form>
            </Layout>
        )
    }
}

export default RequestForm