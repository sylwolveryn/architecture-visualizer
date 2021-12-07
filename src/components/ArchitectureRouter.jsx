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
import NodeSimpleReport from "./NodeSimpleReport";

function ArchitectureRouter({repo}) {
    let history = useHistory()

    React.useEffect(() => {
        if (window.location.pathname !== `/${repo}/node`) history.push(`/${repo}/node`)
    }, [repo, history])

    return (
        <Switch>
            <Route path="/:repo/tech">
                <Tech/>
            </Route>
            <Route path="/:repo/react">
                <ComponentView/>
            </Route>
            <Route path="/:repo/node">
                <NodeReportView/>
            </Route>
            <Route path="/:repo/node-simple">
                <NodeSimpleReport/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
            <Redirect from="/" to={homeURI}/>
        </Switch>
    )
}

export default ArchitectureRouter