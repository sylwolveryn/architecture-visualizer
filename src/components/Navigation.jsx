import {Alignment, Button, Navbar} from "@blueprintjs/core"
import {Link} from "react-router-dom"
import {names} from "../routers/repo-routing"

export default function Navigation({repo, handleRepositoryUpdate}) {
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Architecture visualizer</Navbar.Heading>
                <Navbar.Divider />
                <select onChange={handleRepositoryUpdate} value={repo}>
                    {names.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
                <Navbar.Divider />
                <Link to="/"><Button className="bp3-minimal" icon="home" text="Home" /></Link>
                <Link to={`/${repo}/tech`}><Button className="bp3-minimal" icon="dashboard" text="Technology Radar" /></Link>
                <Link to={`/${repo}/node`}><Button className="bp3-minimal" icon="cog" text="Node" /></Link>
                <Link to={`/${repo}/node-simple`}><Button className="bp3-minimal" icon="cog" text="Node simple" /></Link>
                <Link to={`/${repo}/react`}><Button className="bp3-minimal" icon="data-lineage" text="react" /></Link>
            </Navbar.Group>
        </Navbar>
    )
}