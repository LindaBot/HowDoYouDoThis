import * as React from 'react'
import {Button, TextField} from "@material-ui/core"
import * as CryptoJS from 'crypto-js'

interface IState{
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dateCreated: string,
    admin: boolean,
    tagID: string
}

export default class UserPassBut extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        const date = new Date().getDate().toString() +'/'+ (new Date().getMonth() + 1) + '/' + (new Date().getFullYear());
        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            dateCreated: date,
            admin: false,
            tagID: ""
        };
    }

    public render(){
        return(
            <div>
                <TextField
                    id="username"
                    label="Username"
                    value={this.state.username}
                    onChange={(e) => {this.handleChangeValue(e, "username")}}
                    margin="normal"
                    variant="outlined"
                />

                <br/>

                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={(e) => {this.handleChangeValue(e, "password")}}
                    margin="normal"
                    variant="outlined"
                />

                <br/>

                <TextField
                    id="firstName"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={(e) => {this.handleChangeValue(e, "firstName")}}
                    margin="normal"
                    variant="outlined"
                />

                <br/>

                <TextField
                    id="lastName"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={(e) => {this.handleChangeValue(e, "lastName")}}
                    margin="normal"
                    variant="outlined"
                />

                <br/>

                <Button onClick={this.onSubmit}>
                    {this.props.hintText}
                </Button>
            </div>
            
        )
    }

    private handleChangeValue = (e: any, fieldName: string) => {
        switch (fieldName){
            case "username":
                return(this.setState({username: e.target.value}));
            case "password":
                return(this.setState({password: e.target.value}));
            case "firstName":
                return(this.setState({firstName: e.target.value}));
            case "lastName":
                return(this.setState({lastName: e.target.value}));
        }
    }

    private onSubmit = () =>{
        let pass = this.state.password;
        pass = CryptoJS.AES.encrypt(this.state.password, "secret").toString();
        let formData = new FormData();
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('username', this.state.username);
        formData.append('password', pass);
        formData.append('dateCreated', this.state.dateCreated);
        formData.append('admin', 'false');
        formData.append('tagID', this.state.tagID);
        this.props.onSubmit(formData);
    }

}