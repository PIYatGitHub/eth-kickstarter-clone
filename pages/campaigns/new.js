import React, { Component } from "react"
import Layout from "../../components/layout"
import { Button, Form, Input } from "semantic-ui-react"

class CampaignNew extends Component {
    state = {
        minimumContribution: '1000000'
    }
    render() {
        return (<Layout>
            <h2>Let's go make something great!</h2>

            <Form>
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

                <Button primary>Create!</Button>
            </Form>
        </Layout>)
    }
}

export default CampaignNew