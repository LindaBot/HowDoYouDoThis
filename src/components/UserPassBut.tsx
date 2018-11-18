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
                    onChange={this.handleChangeUsername}
                    margin="normal"
                    variant="outlined"
                />

                <br/>

                <TextField
                    id="outlined-name"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
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

    private handleChangeUsername = (e: any) => {
        this.setState({username: e.target.value});
    }

    private handleChangePassword = (e: any) => {
        this.setState({password: e.target.value});
    }

    private onSubmit = () =>{
        this.props.onSubmit(this.state.username, this.state.password);
    }

}