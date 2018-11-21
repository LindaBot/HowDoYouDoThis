import * as React from 'react'
import {Button} from '@material-ui/core'
import Translate from '@material-ui/icons/Translate'

export default class TranslateButton extends React.Component<any>{
    constructor(props: any){
        super(props);
    }

    render(){
        return(
            <Button onClick={this.Translate} variant="contained"><Translate/>To English</Button>
        )
    }

    private Translate = () => {
        let accessToken: string;
        let object = '[{ "Text":"' + this.props.text + '"}]'
        // let toBeTranslated = JSON.stringify(object);
        fetch('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': 'b03b8dd2c2cc4939b5187970a40cf769'
            },
            method: 'POST'
        }).then((response) => {
            // //console.log(response.text())
            return response.text()
        }).then((response) => {
            // console.log(response)
            accessToken = response
        }).catch((error) => {
            //console.log("Error", error)
        }).then(e=>{
        fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en', {
            body: object, // this is a .wav audio file    
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },    
            method: 'POST'
        }).then((res) => {
            return res.json()
        }).then((res: any) => {
            const translated = res[0].translations[0].text;
            this.props.callback(translated, "translation");
        }).catch((error) => {
            console.log("Error", error)
        })});
    }
}