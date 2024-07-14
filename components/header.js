import React from "react"
import { Menu } from "semantic-ui-react"
import { Link } from "../routes"

export default () => {
    return <Menu style={{ marginTop: '1rem' }}>
        <Link route="/" legacyBehavior><a className="item">CrowdCoin</a></Link>
        <Menu.Menu position="right">
            <Link route="/" legacyBehavior><a className="item">Campaigns</a></Link>
            <Link route="/campaigns/new" legacyBehavior><a className="item">+</a></Link>
        </Menu.Menu>

    </Menu>

}