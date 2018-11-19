import * as React from 'react'
import {AppBar, Tabs, Tab, Typography} from "@material-ui/core"
import SwipeableViews from 'react-swipeable-views';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import * as CryptoJS from 'crypto-js'

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
                    <LoginForm onSubmit={this.loginClick} hintText={"Login"}/>
                </Typography>

                <Typography component="div" style={{ padding: 8 * 3 }}>
                    <RegisterForm onSubmit={this.registerClick} hintText={"Register"}/>
                </Typography>

            </SwipeableViews>
        </div>
        )
    }

    public handleChange = (e: any, value: number) => {
        this.setState({value});
    }

    private loginClick = (formData: FormData) => {
        // const username = formData.get("username");
        let userpass = formData.get("password") as string;
        let username = formData.get("username") as string;
    
        fetch('https://howdoidothisapixlin928.azurewebsites.net/api/User', {
            method: 'GET'
        })
        .then(response => response.json())
        .then((response: JSON) => {
            console.log(response);
            var count = Object.keys(response).length;
            for(var i = 0; i < count; i++){
                let userObject = response[i];
                var password = CryptoJS.AES.decrypt(userObject.password, 'secret');
                password = password.toString(CryptoJS.enc.Utf8);
                console.log("User and password pair")
                console.log(userpass);
                console.log(password);
                if (userpass == password && username === userObject.username){
                    return(this.props.onLogin(userObject));
                }
            }
            alert("Please check your username and password")
        });
    }

    private registerClick = (userData: FormData) => {
        fetch('https://howdoidothisapixlin928.azurewebsites.net/api/User', {
            // body: userData,
            method: 'POST',
            body: userData,
            headers: {
                'Access-Control-Allow-Origin': "*",
            }
        })
        .then((response: any) => {
            console.log(response)
            if (response.ok){
                alert("User created, please login");
                location.reload();
            } else {
                alert("Username taken, please change your username")
            }
        })
    }
}

