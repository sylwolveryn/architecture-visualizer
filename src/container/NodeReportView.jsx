import {Button, ButtonGroup, Card, Elevation} from "@blueprintjs/core"
import React, {useState} from "react"
import RadialTreeGraph from "../components/RadialTreeGraph"
import dependencyReducer from "../generated/repositories-dependency-reducer"
import {getCleanedDependencies} from "../utils/dependency-utils"
import {useParams} from "react-router"
import ErrorView from "../components/Error"
import { useWindowResize } from 'beautiful-react-hooks';


const Views = {
    FRAMEWORKS: "FRAMEWORKS",
    DEV_DEP: "DEVELOPMENT DEPENDENCIES",
    DEP_GROUP: "DEPENDENCY GROUPS",
    PEER_DEP: "PEER DEPENDENCIES",
}

function NodeReportView() {
    const [height, setHeight] = useState(window.innerHeight);
    const onWindowResize = useWindowResize();

    onWindowResize(() => {
        setHeight(window.innerHeight);
    });

    const [view, setView] = useState(Views.FRAMEWORKS)
    const {repo} = useParams()
    const repositoryName = repo.replaceAll('-', '')
    const dependencies = dependencyReducer[repositoryName]
    const cleanedDependencies = getCleanedDependencies(dependencies)

    return (
        <div>
            <ButtonGroup>
                {cleanedDependencies.frameworks && (
                    <Button
                    icon={"graph"}
                    onClick={() => {
                        setView(Views.FRAMEWORKS)
                    }}
                >
                    Frameworks
                </Button>
                )}
                {cleanedDependencies.devDependencyGroups && (
                    <Button
                    icon={"graph"}
                    onClick={() => {
                        setView(Views.DEV_DEP)
                    }}
                >
                    Dev Dependency
                </Button>
                )}
                {cleanedDependencies.dependencyGroups && (
                <Button
                    icon={"graph"}
                    onClick={() => {
                        setView(Views.DEP_GROUP)
                    }}
                >
                    Dependency Groups
                </Button>
                )}
                {cleanedDependencies.peerDependencyGroups && (
                    <Button
                        icon={"graph"}
                        onClick={() => {
                            setView(Views.PEER_DEP)
                        }}
                    >
                        Peer Dependency
                    </Button>
                )}
            </ButtonGroup>

            <h1 style={{textAlign: "center"}}>
                {dependencies.name} - {dependencies.language}
            </h1>

            <Card
                interactive={false}
                elevation={Elevation.FOUR}
                style={{margin: "0px auto", maxWidth: "95%", height: `${height-240}px`}}
            >
                {view === Views.FRAMEWORKS && cleanedDependencies.frameworks ? (
                    <RadialTreeGraph
                        data={{
                            frameworks: cleanedDependencies.frameworks,
                        }}
                    />
                ) : view === Views.FRAMEWORKS && <ErrorView err={`${dependencies.name} does not have any framework. Select another view please!`}/>
                }
                {view === Views.DEV_DEP && cleanedDependencies.devDependencyGroups ? (
                    <RadialTreeGraph
                        data={{
                            devDependencyGroups: cleanedDependencies.devDependencyGroups,
                        }}
                    />
                ) : view === Views.DEV_DEP && <ErrorView err={`${dependencies.name} does not have dev dependencies. Select another view please!`}/>
                }
                {view === Views.DEP_GROUP && cleanedDependencies.dependencyGroups ? (
                    <RadialTreeGraph
                        data={{
                            dependencyGroups: cleanedDependencies.dependencyGroups,
                        }}
                    />
                ) : view === Views.DEP_GROUP && <ErrorView err={`${dependencies.name} does not have dependencies. Select another view please!`} />
                }
                {view === Views.PEER_DEP && cleanedDependencies.peerDependencyGroups ? (
                    <RadialTreeGraph
                        data={{
                            peerDependencyGroups: dependencies.peerDependencyGroups,
                        }}
                    />
                ) : view === Views.PEER_DEP && <ErrorView err={`${dependencies.name} does not have peer dependencies. Select another view please!`} />
                }
            </Card>
        </div>
    )
}

export default NodeReportView
