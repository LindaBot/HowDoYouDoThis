import * as React from "react"
import {AppBar, Toolbar, IconButton, Typography, Slide} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import NewQuestion from './NewQuestion';
import { Dialog } from 'react-bootstrap/lib/Modal';

interface IState{
    open: boolean
} 

class AddQuestionButton extends React.Component<{}, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            open: false
        };
    }

    render(){
            return(
                <div>
                <div>
                    <button onClick={this.onClick}>Click me</button>
                </div>

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
                                        Post
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div className="fullscreen">
                                <NewQuestion onSubmit={this.onSubmit}/>
                            </div>
                        </div>
                    </Dialog>
                </Slide>
                </div>
            )
        
    }

    private onClick = () =>{
        this.setState({open: true});
    }

    private handleClose = () =>{
        this.setState({open: false});
    }

    private onSubmit = (formData: FormData) => {
        console.log(formData);
        this.setState({open: false});
    }
}

export default (AddQuestionButton);
