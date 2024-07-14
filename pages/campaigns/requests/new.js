import React, { Component } from "react"
import Layout from "../../../components/layout"
import { Button } from "semantic-ui-react"
import { Link } from "../../../routes"

class RequestForm extends Component {
    static async getInitalProps(props) {
        const { address } = props.query

        return { address }
    }

    render() {
        return (
            <Layout>
                <h3>Add a request</h3>
            </Layout>
        )
    }
}

export default RequestForm