import * as React from 'react'
import {TextField, Button} from '@material-ui/core'

interface IState{
    title: any,
    description: any,
    tag: any
}

export default class NewAnswerButton extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = ({
            title: "",
            description: "",
            tag: ""
        })
    }

    componentDidMount(){
        this.getQuestionData();
    }

    private handleShortcut = (event: any) => {
        if(event.key == "Escape") {
            this.props.onClose();
        }
        if(event.key === "Enter") {
            this.onSubmit();
        }
    }

    render(){
        return(
            <div className="centre80" onKeyDown={this.handleShortcut}>
                <TextField
                    label="Title"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.title}
                    onChange={ (e) => this.onChangeInput(e, "title")}
                /> <br/>

                <TextField
                    required
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    multiline
                    rowsMax="6"
                    rows='4'
                    fullWidth
                    value={this.state.description}
                    onChange={ (e) => this.onChangeInput(e, "description")}
                /> <br/>

                <TextField
                    required
                    label="Tag"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.tag}
                    onChange={ (e) => this.onChangeInput(e, "tag")}
                /> <br/>
                
                

                <div style={{width: "100%", textAlign:"center"}}>
                    <Button style={{textAlign:"right", height:"20px", margin:"20px 0"}} variant="contained" onClick={this.onSubmit}>Save</Button>
                </div>
            </div>
        )
    }

    private getQuestionData = () =>{
        const problem = this.props.problem;
        this.setState({
            title: problem.title,
            description: problem.description,
            tag: problem.tag
        }) 
    }

    private onChangeInput = (e:any, type: string) => {
        switch (type){
            case "title":
                return(this.setState({title: e.target.value}));
            case "description":
                return(this.setState({description: e.target.value}));
            case "tag":
                return(this.setState({tag: e.target.value}));
        }
    }

    private onSubmit = () =>{
        if (this.state.title === "" || this.state.description === "" || this.state.tag === ""){
            alert("Please fill in your details");
            return;
        }
        let newProblem = this.props.problem;
        if (this.state.title === newProblem.title && this.state.description === newProblem.description && this.state.tag === newProblem.tag)
        {
            alert("Nothing changed");
            return;
        }

        if (this.state.title != newProblem.title){newProblem.title = this.state.title;}
        if (this.state.description != newProblem.description){newProblem.description = this.state.description;}
        if (this.state.tag != newProblem.tag){newProblem.tag = this.state.tag;}
        // console.log(newProblem);
        this.props.onSubmit(newProblem);

    }

} 