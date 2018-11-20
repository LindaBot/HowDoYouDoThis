import * as React from "react"
import {Paper} from "@material-ui/core"
import { Redirect } from 'react-router-dom'
/* 
import * as InfiniteScroll from 'react-infinite-scroller';
 */

interface IState{
    redirect: any
}

export default class QuestionShowcase extends React.Component<any, IState>{
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
                <Paper>
                    <button onClick={this.goToQuestion}>help</button>
                    {question.title}
                </Paper>
            )
            
        }

        
    }

    private goToQuestion = () =>{
        this.setState({redirect: true});
    }
}