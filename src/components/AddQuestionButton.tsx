import * as React from "react"
import {AppBar, Toolbar, IconButton, Typography, Slide, Tooltip, Button} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"
import NewQuestion from './NewQuestion';
import { Dialog } from 'react-bootstrap/lib/Modal';

interface IState{
    open: boolean
} 

class AddQuestionButton extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            open: false
        };
    }

    render(){
            return(
                <div>
                <div className="addIcon">
                    <Tooltip title="Add Question">
                        <Button variant="fab" color="secondary" onClick={this.onClick}>
                        <AddIcon />
                        </Button>
                    </Tooltip>
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
                                <NewQuestion onSubmit={this.onSubmit} suggestions={this.props.suggestions}/>
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
        //console.log(formData);
        this.setState({open: false});
        fetch('https://howdoidothisapixlin928.azurewebsites.net/api/Question', {
            // body: userData,
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': "*",
            }
        })
        .then((response: any) => {
            //console.log(response)
            if (response.ok){
                alert("Question made");
                location.reload();
            } else {
                alert("Error")
            }
        })
    }
}

export default (AddQuestionButton);
