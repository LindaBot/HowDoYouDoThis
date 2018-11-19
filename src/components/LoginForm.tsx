import * as React from 'react'
import {Button, TextField} from "@material-ui/core"

interface IState{
    username: string,
    password: string
}

export default class UserPassBut extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    public render(){
        return(
            <div>
                <TextField
                    id="outlined-name"
                    label="Username"
                    value={this.state.username}
                    onChange={(e) => {this.handleChangeValue(e, "username")}}
                    margin="normal"
                    variant="outlined"
                />

                <br/>

                <TextField
                    id="outlined-name"
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={(e) => {this.handleChangeValue(e, "password")}}
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
        }
    }

    private onSubmit = () =>{
        if (this.state.username != "" && this.state.username != ""){
            let formData = new FormData();
            formData.append('username', this.state.username);
            formData.append('password', this.state.password);
            this.props.onSubmit(formData);
        } else {
            alert("Please enter your username and password")
        }
    }

}