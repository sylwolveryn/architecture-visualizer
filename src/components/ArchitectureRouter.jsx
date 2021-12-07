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
        if (window.location.pathname !== `/architecture-visualizer/${repo}/node`) history.push(`/architecture-visualizer/${repo}/node`)
    }, [repo, history])

    return (
        <Switch>
            <Route path="/architecture-visualizer/:repo/tech">
                <Tech/>
            </Route>
            <Route path="/architecture-visualizer/:repo/react">
                <ComponentView/>
            </Route>
            <Route path="/architecture-visualizer/:repo/node">
                <NodeReportView/>
            </Route>
            <Route path="/architecture-visualizer/">
                <Home/>
            </Route>
            <Redirect from="/" to={homeURI}/>
        </Switch>
    )
}

export default ArchitectureRouter