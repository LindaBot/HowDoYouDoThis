import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
/* import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom'; */

export default class Header extends React.Component<{}>{

    constructor(props: any){
        super(props);
    }
    render(){
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Link
                    </NavItem>
                    
                    </Nav>
                    <Nav pullRight>
                    <NavItem eventKey={1} href="#" >
                        Link Right
                    </NavItem>
                    <NavItem eventKey={2} onClick={this.logout}>
                        Logout
                    </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    private logout = () => {
        localStorage.removeItem("user");
        location.reload();
    }
}