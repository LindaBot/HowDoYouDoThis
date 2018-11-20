import * as React from "react"
import {Paper, Button} from "@material-ui/core"
import { Redirect } from 'react-router-dom'
/* 
import * as InfiniteScroll from 'react-infinite-scroller';
 */

interface IState{
    redirect: any
}

export default class QuestionItem extends React.Component<any, IState>{
    constructor(props: any){
        super(props)
        this.state = {
            redirect: false
        }
    }
    
    render(){
        const question = this.props.question;
        if (this.state.redirect == true){
            return (<Redirect to={'/problem/'+this.props.question.id} />)
        } else {
            return(
                <Button onClick={this.goToQuestion} fullWidth>
                <Paper style={{width:"100%", height: "100%"}}>
                    {question.title}
                </Paper>
                </Button>
            )
            
        }

        
    }

    private goToQuestion = () =>{
        this.setState({redirect: true});
    }
}