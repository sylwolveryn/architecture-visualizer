import React from "react"
import {Card, Elevation} from "@blueprintjs/core"
import {whatTheHack} from "../resources/images"
import {stylingObject} from "./ErrorSt"

function ErrorView({err, errorInfo}) {
    return (
        <Card interactive={false} elevation={Elevation.FOUR}>
            <div style={stylingObject.wrapper}>
                <div style={stylingObject.sidebar}>
                    <img style={stylingObject.image} src={whatTheHack}  alt={"What the hack?"} />
                </div>
                <div style={stylingObject.content}>
                    <h5>So sorry, cannot render the request. See the reason below:</h5>
                    <p>{err}</p>
                    {errorInfo && (<pre>{JSON.stringify(errorInfo, null, 4)}</pre>)}
                </div>
            </div>

        </Card>
    )
}

export default ErrorView
