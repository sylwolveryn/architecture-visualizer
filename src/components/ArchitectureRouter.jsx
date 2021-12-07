import React from "react"
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom"
import ComponentView from "./ComponentView"
import Tech from "./Tech"
import Home from "./Home"
import NodeReportView from "../container/NodeReportView"
import NodeSimpleReport from "./NodeSimpleReport";
import {homeURI} from "../utils/router-utils";

function ArchitectureRouter() {
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
            <Route path="/architecture-visualizer/:repo/node-simple">
                <NodeSimpleReport/>
            </Route>
            <Route path="/architecture-visualizer/">
                <Home/>
            </Route>
            <Redirect from="/" to={homeURI}/>
        </Switch>
    )
}

export default ArchitectureRouter