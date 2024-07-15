import React, { Component } from "react"
import { Table } from "semantic-ui-react"
import web3 from "../etherium/web3"

class RequestRow extends Component {
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
                <Cell>Approve</Cell>
                <Cell>Finalize</Cell>
            </Row>
        )
    }
}

export default RequestRow