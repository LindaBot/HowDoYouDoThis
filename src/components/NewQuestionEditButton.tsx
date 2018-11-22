import * as React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Slide, Button} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import EditQuestionUI from './EditQuestionUI';
import { Dialog } from 'react-bootstrap/lib/Modal';

interface IState{
    open: any
}

export default class NewQuestionEditButton extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = ({
            open: false
        })
    }

    render(){
        return(
            <div style={{display:"inline-block"}}>
                <br/>
                <Button onClick={this.onClickOpen} className="navButton" variant="contained">Edit </Button>

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
                                        Edit Post
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div className="fullscreen">
                                <EditQuestionUI onSubmit={this.onSubmit} problem={this.props.problem}/>
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

    private onSubmit = (newProblemData: any) => {
        this.setState({open: false});
        const url = 'https://howdoidothisapixlin928.azurewebsites.net/api/Question/'+newProblemData.id;
        //console.log(url);
        fetch(url, {
            body: JSON.stringify(newProblemData),
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Content-Type': "application/json"
            }
        })
        .then((response: any) => {
            //console.log(response)
            if (response.ok){
                alert("Information updated");
                location.reload();
            } else {
                alert("Error")
            }
        })
        .catch(err => {
            //console.log("Server error");
        })
    }
}

