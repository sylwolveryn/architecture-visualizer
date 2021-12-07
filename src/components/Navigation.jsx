import {Alignment, Button, Navbar} from "@blueprintjs/core"
import {Link} from "react-router-dom"
import {names} from "../routers/repo-routing"

export default function Navigation({repo, handleRepositoryUpdate}) {
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Architecture visualizer</Navbar.Heading>
                <Navbar.Divider />
                <select id="lang" onChange={handleRepositoryUpdate} value={repo}>
                    {names.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
                <Navbar.Divider />
                <Link to="/architecture-visualizer"><Button className="bp3-minimal" icon="home" text="Home" /></Link>
                <Link to={`/architecture-visualizer/${repo}/tech`}><Button className="bp3-minimal" icon="dashboard" text="Technology Radar" /></Link>
                <Link to={`/architecture-visualizer/${repo}/node`}><Button className="bp3-minimal" icon="cog" text="Node" /></Link>
                <Link to={`/architecture-visualizer/${repo}/react`}><Button className="bp3-minimal" icon="data-lineage" text="react" /></Link>
            </Navbar.Group>
        </Navbar>
    )
}