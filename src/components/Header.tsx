import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, withStyles} from "@material-ui/core"

const stylesConst = {
    root: {
      background: "red",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    }
  };
  
interface IState {
    styles: any
}

class Header extends React.Component<{}, IState>{

    constructor(props: any){
        super(props);
        this.state = {
            styles:stylesConst
        }
    }
    render(){
        return (
            <Navbar collapseOnSelect style={{backgroundColor:"#2196f3 !important"}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Button className="navButton"><Link to="/" className="navButton">HowDoYouDoThis</Link></Button>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
                    </NavItem>
                    
                    </Nav>
                    <Nav pullRight>
                    <NavItem eventKey={2} onClick={this.logout}>
                        <Link to="/" style={{textDecoration:"None"}}>Settings</Link>
                    </NavItem>
                    <NavItem eventKey={2} onClick={this.logout}>
                        <Link to="/" style={{textDecoration:"None", color: "gray"}}>Logout</Link>
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

export default withStyles(stylesConst)(Header);
