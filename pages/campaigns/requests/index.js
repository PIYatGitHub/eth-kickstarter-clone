import React, { Component } from "react"
import Layout from "../../../components/layout"
import { Button } from "semantic-ui-react"
import { Link } from "../../../routes"

class RequestsIndex extends Component {
    static async getInitalProps(props) {
        const { address } = props.query

        return { address }
    }

    render() {
        return (<Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`} legacyBehavior>
                <a>
                    <Button primary>
                        Add request
                    </Button>
                </a>
            </Link>

        </Layout>)
    }
}

export default RequestsIndex