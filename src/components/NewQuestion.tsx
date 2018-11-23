import * as React from 'react'
import {TextField, Button} from '@material-ui/core'
import CreatableSelect from 'react-select/lib/Creatable'
import MediaStreamRecorder from 'msr'
import VoiceIcon from '@material-ui/icons/SettingsVoice'
import TranslateButton from './TranslateButton'

interface IState{
    title: string,
    description: string,
    tag: any,
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
                { label: "" },
            ].map(suggestion => ({
                value: suggestion.label,
                label: suggestion.label
            }))
        }
    };

    private handleShortcut = (event: any) => {
        if(event.key == "Escape") {
            this.props.onClose();
        }
    }
    
    render(){
        return(
            <div className="centre80" onKeyDown={this.handleShortcut}>
                <h2> New Question </h2>

                <TextField
                required
                label="Question title"
                margin="normal"
                variant="outlined"
                fullWidth
                value={this.state.title}
                onChange={ (e) => this.onChangeInput(e, "title")}
                /> <br/>

                <TextField
                required
                label="Question description"
                placeholder="You can type in any language and click To English"
                multiline
                rowsMax="4"
                rows="2"
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.description}
                onChange={ (e) => this.onChangeInput(e, "description")}
                /> 
                
                <br/>
                
                <Button className="speechButton"onClick={this.inputByVoice}><VoiceIcon/>Describe with speech</Button>&#160;&#160;&#160;&#160;
                <TranslateButton text={this.state.description} callback={this.onChangeInput}/>
                <br/>
                
                <CreatableSelect 
                className="selectInput"
                options={this.props.suggestions}
                placeholder="Search a Tag*"
                value={this.state.tag}
                onChange={ (e) => this.onChangeInput(e, "tag")}
                /> <br/>
                
                <p>
                    Optional photo upload<br/>
                    <input type="file" onChange={ (e) => this.onChangeInput(e, "file")}/>
                </p> 
                
                <div style={{width: "100%", textAlign:"center"}}>
                    <Button style={{textAlign:"right", height:"20px", margin:"20px 0"}} onClick={this.onSubmit} variant="contained">Submit Question</Button>
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
            case "translation":
            return(this.setState({description: e}));
        }
    }
    
    
    
    private onSubmit = () => {
        const state = this.state;
        //console.log();
        if (state.title === "" || state.description === "" || state.tag === ""){
            alert("Please fill in the form");
            return;
        }
        const formData = new FormData();
        formData.append("title", state.title);
        formData.append("description", state.description);
        //console.log(state.tag.value);
        formData.append("tag", state.tag.value);
        if (state.image != ""){
            formData.append("image", state.image[0])
        }
        formData.append("authorID", state.user.id);
        this.props.onSubmit(formData);
    }
    
    private inputByVoice = () => {
        // The following two functions are a modification of NZMSA's tutorial code
        navigator.mediaDevices.getUserMedia({audio:true})
        .then((stream)=> {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                mediaRecorder.stop()
                this.PostAudio(blob);
            }
            mediaRecorder.start(3000);
        })
        .catch((e:any)=>{
            console.log(e);
            alert("Server error, please try again later.")
        })
    }
    
    private PostAudio = (blob: any) => {
        let accessToken: any;
        fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
        headers: {
            'Content-Length': '0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': '89e0a4141353471fa73369cc6a75f78d'
        },
        method: 'POST'
    }).then((response) => {
        // //console.log(response.text())
        return response.text()
    }).then((response) => {
        //console.log(response)
        accessToken = response
    }).catch((error) => {
        //console.log("Error", error)
    });
    // posting audio
    fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
    body: blob, // this is a .wav audio file    
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + accessToken,
        'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
        'Ocp-Apim-Subscription-Key': '7858d17484424d4d93d43c177c1268ce'
    },    
    method: 'POST'
    }).then((res) => {
        return res.json()
    }).then((res: any) => {
        const text = (res.DisplayText as string).slice(0, -1)
        this.setState({description: text});
    }).catch((error) => {
        //console.log("Error", error)
    });
    }
}