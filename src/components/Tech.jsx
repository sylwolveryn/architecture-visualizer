import React from "react"
import {Card, Elevation} from "@blueprintjs/core"

function Tech() {
    return (
        <Card interactive={false} elevation={Elevation.FOUR}>
            <h2>TODO: find the right visualization for the radar. Maybe not with the classic 4 (HOLD, ASSESS, TRIAL, ADOPT) attr</h2>
            <h5>Tech radar</h5>
            <img style={{"maxWidth": "100%", "maxHeight": "100%"}} alt="tech-radar" src="https://insights-images.thoughtworks.com/Screen20Shot202018050820at20103636_ec3d1c528fec0689640832df9ef82945.png"></img>
        </Card>
    )
}

export default Tech