import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import logo from '../images/Logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
const Navibar = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    return (
        <Navbar className="px-md-5 navi" bg="transparent" expand="lg">
            <Navbar.Brand ><Link to="/home"><img src={logo} alt="Logo" /></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto ">
                    <Link className="nav-link" to="/home">Home</Link>
                    {/* <Link className="nav-link" to="/">Rooms</Link> */}
                    <Link className="nav-link" to="/About">About</Link>
                    <Link className="nav-link" to="/Contact">Contact</Link>
                    <Link className="nav-link" to="/MyRent">Dashboard</Link>

                    {!sessionStorage.getItem('CurrentUser') && !loggedInUser.email && 
                        <Link to="/Login"> <Button className="btn" variant="info">Log in</Button></Link>
                    }

                    {sessionStorage.getItem('CurrentUser') || loggedInUser.email ?
                        <Button className="btn" variant="info" onClick={() => { setloggedInUser(''); sessionStorage.removeItem("CurrentUser"); }}>Log Out</Button>
                    :''}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navibar;








