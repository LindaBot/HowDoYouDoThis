import * as React from 'react'
import {TextField, Button} from '@material-ui/core'
import * as CryptoJS from 'crypto-js'

interface IState{
    open: any
    user: any
    firstName: any,
    lastName: any,
    username: any,
    dateCreated: any,
    admin: any,
    password: any,
    id: any
}

export default class NewAnswerButton extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = ({
            open: false,
            user: JSON.parse(localStorage.getItem("user") as string),
            firstName: "",
            lastName: "",
            username: "",
            dateCreated: "",
            admin: "",
            password: "",
            id: ""
        })
    }
    
    componentDidMount(){
        this.getUserData();
    }

    private handleShortcut = (event: any) => {
        if(event.key == "Escape") {
            this.props.onClose();
        }
    }
    
    render(){
        return(
            <div className="centre80" onKeyDown={this.handleShortcut}>
                <TextField
                disabled
                label="ID"
                margin="normal"
                variant="outlined"
                fullWidth
                value={this.state.id}
                /> <br/>
                
                <TextField
                required
                label="Username"
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.username}
                disabled
                /> <br/>
                <TextField
                required
                label="First Name"
                margin="normal"
                variant="outlined"
                fullWidth
                value={this.state.firstName}
                onChange={ (e) => this.onChangeInput(e, "firstName")}
                /> <br/>
                
                <TextField
                required
                label="Last Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.lastName}
                onChange={ (e) => this.onChangeInput(e, "lastName")}
                /> 
                
                <TextField
                required
                label="Date created"
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.dateCreated}
                disabled
                /> 
                
                <div>Optional</div>
                
                <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.password}
                onChange={ (e) => this.onChangeInput(e, "password")}
                /> 
                
                <br/>
                
                <div style={{width: "100%", textAlign:"center"}}>
                    <Button style={{textAlign:"right", height:"20px", margin:"20px 0"}} variant="contained" onClick={this.onSubmit}>Save</Button>
                </div>
            </div>
            )
        }
        
    private getUserData = () =>{
        const user = this.state.user;
        this.setState({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            dateCreated: user.dateCreated,
            admin: user.admin
        }) 
    }
    
    private onChangeInput = (e:any, type: string) => {
        switch (type){
            case "firstName":
            return(this.setState({firstName: e.target.value}));
            case "lastName":
            return(this.setState({lastName: e.target.value}));
            case "password":
            return(this.setState({password: e.target.value}));
        }
    }
    
    private onSubmit = () =>{
        const user = this.state.user
        let remotePassword = CryptoJS.AES.decrypt(user.password, "secret");
        remotePassword = remotePassword.toString(CryptoJS.enc.Utf8);
        if (this.state.firstName === "" || this.state.lastName === ""){
            alert("Please fill in your details");
            return;
        }
        let newUserData = this.state.user;
        if (this.state.firstName === this.state.user.firstName && this.state.lastName === this.state.user.lastName 
            && this.state.password === ""){
                alert("Nothing changed");
                return;
            }
            
            if (this.state.password == ""){
                newUserData.password = this.state.user.password;
            } else {
                newUserData.password = CryptoJS.AES.encrypt(this.state.password, "secret").toString();
            }

            if (this.state.firstName != user.firstName){newUserData.firstName = this.state.firstName;}
            if (this.state.lastName != user.lastName){newUserData.lastName = this.state.lastName;}
            
            this.props.onSubmit(newUserData);
    }
}