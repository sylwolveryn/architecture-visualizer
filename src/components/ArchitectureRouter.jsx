import React from "react"
import {
    Switch,
    Route,
} from "react-router-dom"
import ComponentView from "./ComponentView"
import Tech from "./Tech"
import Home from "./Home"
import NodeReportView from "../container/NodeReportView"
import NodeSimpleReport from "./NodeSimpleReport";

function ArchitectureRouter() {
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
        </Switch>
    )
}

export default ArchitectureRouter