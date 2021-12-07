import React, {useEffect, useRef} from "react"
import {Card, Elevation} from "@blueprintjs/core"
import dependencies from "../generated/architecture-visualizer/dependencies"
import JSONFormatter from "json-formatter-js"

function NodeSimpleReport() {
    const dependenciesToDisplay = { ...dependencies }
    delete dependenciesToDisplay.name
    const simpleViewContainer = useRef()
    const formatter = new JSONFormatter(dependenciesToDisplay)
    const simpleView = formatter.render()
    formatter.openAtDepth(2)
    simpleView.children[0].children[1].textContent = dependencies.name
    console.log(simpleView)
    useEffect(() => simpleViewContainer.current.appendChild(simpleView))

    return (
        <Card interactive={false} elevation={Elevation.FOUR}>
            <div ref={simpleViewContainer} ></div>
        </Card>
    )
}

export default NodeSimpleReport