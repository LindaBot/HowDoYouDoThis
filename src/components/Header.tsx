import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewSettingButton from './NewSettingButton'

export default class Header extends React.Component<{}>{

    constructor(props: any){
        super(props);
    }
    render(){
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">dankNotDank</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>

                    <NavItem eventKey={2} href="#">
                        Link
                    </NavItem>
                    
                    </Nav>
                    <Nav pullRight>

                        <NavItem eventKey={2}>
                            <NewSettingButton/>
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