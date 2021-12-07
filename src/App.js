import React, {useState} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import Navigation from "./components/Navigation"
import ArchitectureRouter from "./components/ArchitectureRouter"
import ErrorBoundary from "./components/ErrorBoundary"
import {names} from "./routers/repo-routing"

export default function App() {
    const [repo, setRepo] = useState(names[0])
    const setRepositoryName = ({target: {value}}) => setRepo(value)

    return (
        <ErrorBoundary>
            <Router>
                <div>
                    <Navigation repo={repo} handleRepositoryUpdate={setRepositoryName}></Navigation>
                    <ArchitectureRouter />
                </div>
            </Router>
        </ErrorBoundary>
    )
}
