import * as React from 'react'
import {AppBar, Tabs, Tab, Typography} from "@material-ui/core"
import SwipeableViews from 'react-swipeable-views';
import UserPassBut from './UserPassBut'

interface IState{
    username: string,
    password: string,
    value: number
}


export default class LoginInterface extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            username: "",
            password: "",
            value: 0
        }
    }

    public render(){
        return(
            <div className="centreElement" style={{ width: "500px"}}>
            <AppBar position="static" color="default">
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
            >
                <Tab label="Sign in" />
                <Tab label="Register" />
            </Tabs>
            </AppBar>
            <SwipeableViews
                index={this.state.value}
                onChangeIndex={this.handleChange}
                >
                <Typography component="div" style={{ padding: 8 * 3 }}>
                    <UserPassBut onSubmit={this.loginClick} hintText={"Login"}/>
                </Typography>

                <Typography component="div" style={{ padding: 8 * 3 }}>
                    <UserPassBut onSubmit={this.registerClick} hintText={"Register"}/>
                </Typography>

            </SwipeableViews>
        </div>
        )
    }

    public handleChange = (e: any, value: number) => {
        this.setState({value});
    }

    private loginClick = (username: string, password: string) => {
        alert("Login" + username + password);
    }

    private registerClick = (username: string, password: string) => {
        alert("Register" + username + password);
    }
}

