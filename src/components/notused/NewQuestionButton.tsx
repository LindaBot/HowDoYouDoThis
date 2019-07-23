/* import * as React from 'react'
import {Tooltip, Button,  }from '@material-ui/core'
import {AppBar, Toolbar, IconButton, Typography, Slide} from "@material-ui/core"

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from "@material-ui/icons/Close"
import { Dialog } from 'react-bootstrap/lib/Modal';

interface IState{
    open: any
}

export default class NewQuestionButton extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = ({
            open: false
        })
    }

    render(){
        return(
            <div>
            <div className="addIcon">
                <Tooltip title="Add Answer">
                    <Button variant="fab" color="secondary" onClick={this.onClickAddQuestion}>
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
                        <NewQuestion onSubmit={this.onSubmit}/>
                    </div>
                </div>
            </Dialog>
        </Slide>
        </div>
        )
    }

    private onClickAddQuestion = () => {
        this.setState({open: true})
    }

    private handleClose = () => {
        this.setState({open: false})
    }

    private onSubmit = (formData: FormData) => {
        //console.log(formData);
        formData.append("questionID", this.props.problemID);
        this.setState({open: false});
        fetch('https://howdoyoudothisapi.azurewebsites.net/api/Solution', {
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
                alert("Solution made");
                location.reload();
            } else {
                alert("Error")
            }
        })
    }
}

 */