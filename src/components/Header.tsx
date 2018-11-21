import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Header extends React.Component<{}>{

    constructor(props: any){
        super(props);
    }
    render(){
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">HowDoYouDoThis</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    </Nav>
                    <Nav pullRight>

                        <NavItem onClick={this.logout}>
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