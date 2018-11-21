import * as React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Slide, Button} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import SettingUI from './SettingUI';
import { Dialog } from 'react-bootstrap/lib/Modal';

interface IState{
    open: any
}

export default class NewSettingButton extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = ({
            open: false
        })
    }

    render(){
        return(
            <div style={{display:"inline-block"}}>
            <Button onClick={this.onClickOpen} className="navButton">Settings </Button>

            <Slide direction="up" in={this.state.open}>
            <Dialog>
                <div style={{paddingTop:"0px"}}>
                    <AppBar style={{position: "relative"}}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={this.handleClose}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex: 1}}>
                                Settings
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className="fullscreen">
                        <SettingUI onSubmit={this.onSubmit}/>
                    </div>
                </div>
            </Dialog>
        </Slide>
        </div>
        )
    }

    private onClickOpen = () => {
        this.setState({open: true})
    }

    private handleClose = () => {
        this.setState({open: false})
    }

    private onSubmit = (newUserData: any) => {
        console.log(newUserData);
        this.setState({open: false});
        const url = 'https://howdoidothisapixlin928.azurewebsites.net/api/User/'+newUserData.id;
        console.log(url);
        fetch(url, {
            body: JSON.stringify(newUserData),
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Content-Type': "application/json"
            }
        })
        .then((response: any) => {
            console.log(response)
            if (response.ok){
                alert("Information updated");
                localStorage.setItem('user', JSON.stringify(newUserData));
                location.reload();
            } else {
                alert("Error")
            }
        })
        .catch(err => {
            console.log("Server error");
        })
    }
}

