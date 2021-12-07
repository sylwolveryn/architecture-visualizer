import React, {useState} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import Navigation from "./components/Navigation"
import ArchitectureRouter from "./components/ArchitectureRouter"
import ErrorBoundary from "./components/ErrorBoundary"
import {names} from "./routers/repo-routing"

export default function App() {
    const initRepoName = (names && names.filter(name => name === 'architecture-visualizer')) ? 'architecture-visualizer' : names[0]
    console.log('initRepoName');
    console.log(initRepoName);
    console.log('/initRepoName');
    const [repo, setRepo] = useState(initRepoName)
    const setRepositoryName = ({target: {value}}) => setRepo(value)

    return (
        <ErrorBoundary>
            <Router>
                <div>
                    <Navigation repo={repo} handleRepositoryUpdate={setRepositoryName}></Navigation>
                    <ArchitectureRouter repo={repo}></ArchitectureRouter>
                </div>
            </Router>
        </ErrorBoundary>
    )
}
