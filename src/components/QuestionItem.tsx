import * as React from "react"
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core"
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
        console.log(question.diagramURL)
        if (question.diagramURL === ""){
            question.diagramURL = "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX1458494.jpg"
        }
        if (this.state.redirect == true){
            return (<Redirect to={'/problem/'+this.props.question.id} />)
        } else {
            return(
                 <Card style={{width: "100%"}}>
                        <CardActionArea onClick={this.goToQuestion}>
                            <CardMedia
                            image={question.diagramURL}
                            title="Contemplative Reptile"
                            style={{height: "200px"}}/>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {question.title}
                            </Typography>
                            <Typography component="p">
                                {question.description.length < 20 ? (question.description) : (question.description.substring(0,50)+"...")}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card> 

            )
            
            
        }

        
    }

    private goToQuestion = () =>{
        this.setState({redirect: true});
    } 
}