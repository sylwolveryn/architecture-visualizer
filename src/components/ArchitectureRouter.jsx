import React from "react"
import {
    Switch,
    Route,
} from "react-router-dom"
import {Redirect, useHistory} from "react-router"
import ComponentView from "./ComponentView"
import Tech from "./Tech"
import Home from "./Home"
import NodeReportView from "../container/NodeReportView"
import {homeURI} from "../utils/router-utils"

function ArchitectureRouter({repo}) {
    let history = useHistory()

    React.useEffect(() => {
        if (window.location.pathname !== `/mneszt/architecture-visualizer/${repo}/node`) history.push(`/mneszt/architecture-visualizer/${repo}/node`)
    }, [repo, history])

    return (
        <Switch>
            <Route path="/mneszt/architecture-visualizer/:repo/tech">
                <Tech/>
            </Route>
            <Route path="/mneszt/architecture-visualizer/:repo/react">
                <ComponentView/>
            </Route>
            <Route path="/mneszt/architecture-visualizer/:repo/node">
                <NodeReportView/>
            </Route>
            <Route path="/mneszt/architecture-visualizer/">
                <Home/>
            </Route>
            <Redirect from="/" to={homeURI}/>
        </Switch>
    )
}

export default ArchitectureRouter