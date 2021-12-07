import React from "react"
import {Card, Elevation} from "@blueprintjs/core"

function ComponentView() {
    return (
        <Card interactive={false} elevation={Elevation.FOUR}>
            <h5>Component view</h5>
            <p>TODO content</p>
            <p>https://echarts.apache.org/examples/en/editor.html?c=graph-label-overlap very impressive graph view</p>
            <p>https://echarts.apache.org/examples/en/editor.html?c=graph-npm another good example</p>
            <p>https://openbase.com/js/react-graph-vis possible graph visualizer</p>
        </Card>
    )
}

export default ComponentView