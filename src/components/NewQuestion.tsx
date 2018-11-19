import * as React from 'react'
import {TextField, Button} from '@material-ui/core'
import CreatableSelect from 'react-select/lib/Creatable'

interface IState{
    title: string,
    description: string,
    tag: string,
    image: any,
    authorID: number,
    user: any,
    suggestions: any
}

export default class NewQuestion extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            title: "",
            description: "",
            tag: "",
            image: "",
            authorID: -1,
            user: JSON.parse(localStorage.getItem("user") as string),
            suggestions: [
                { label: "Afghanistan" },
              ].map(suggestion => ({
                value: suggestion.label,
                label: suggestion.label
              }))
        }
    };
    
    render(){
        return(
            <div className="centre80">
                <h2> New Question </h2>
                <TextField
                    required
                    id="outlined-required"
                    label="Question title"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.title}
                    onChange={ (e) => this.onChangeInput(e, "title")}
                /> <br/>
                <TextField
                    id="outlined-multiline-flexible"
                    required
                    label="Question description"
                    multiline
                    rowsMax="4"
                    rows="2"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={this.state.description}
                    onChange={ (e) => this.onChangeInput(e, "description")}
                /> <br/>
                
                
                <CreatableSelect 
                    className="selectInput"
                    options={this.props.suggestions}
                    placeholder="Search a Tag"
                    value={this.state.tag}
                    onChange={ (e) => this.onChangeInput(e, "tag")}
                /> <br/>
                <input type="file" onChange={ (e) => this.onChangeInput(e, "file")}/> 
                
                <br/>
                <div style={{width: "100%", textAlign:"center"}}>
                    <Button style={{textAlign:"right", height:"20px", margin:"20px 0"}} onClick={this.onSubmit}>Upload</Button>
                </div>
            </div>
        )
    }

    private onChangeInput = (e:any, type: string) => {
        switch (type){
            case "title":
                return(this.setState({title: e.target.value}));
            case "description":
                return(this.setState({description: e.target.value}));
            case "tag":
                return(this.setState({tag: e}));
            case "file":
                return(this.setState({image: e.target.files}));
            case "authorID":
                return(this.setState({authorID: e.target.value}));
        }
    }

    private onSubmit = () => {
        const state = this.state
        if (state.title === "" || state.description === "" || state.tag === ""){
            alert("Please fill in the form");
            return;
        }
        const formData = new FormData();
        formData.append("title", state.title);
        formData.append("description", state.description);
        formData.append("tag", state.tag);
        if (state.image != ""){
            formData.append("image", state.image)
        }
        formData.append("authorID", state.user.authorID);
        this.props.onSubmit(formData);
    }
}