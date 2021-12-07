import ErrorView from "./Error"
import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.error) {
            return <ErrorView err={`Error: ${this.state.error}`} errorInfo={this.state.errorInfo} />
        }

        return this.props.children
    }
}

export default ErrorBoundary