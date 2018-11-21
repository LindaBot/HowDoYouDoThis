import * as React from "react"
import {Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button} from "@material-ui/core"
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
        const user = JSON.parse(localStorage.getItem("user") as string);
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
                            <h4>
                                {question.title.length < 20 ? (question.title) : (question.title.substring(0,25)+"...")}
                                </h4>
                            <Typography component="p">
                                {question.description.length < 20 ? (question.description) : (question.description.substring(0,35)+"...")}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={this.goToQuestion}> View </Button>
                            {user.admin===true || user.id === question.authorID? <Button onClick={this.deleteQuestion} color="secondary"> Delete </Button> : ""}
                        </CardActions>
                    </Card> 

            )
            
            
        }

        
    }

    private goToQuestion = () =>{
        this.setState({redirect: true});
    }
    
    private deleteQuestion = () =>{
        const question = this.props.question;
        const url = ("https://howdoidothisapixlin928.azurewebsites.net/api/Question/" + question.id)
        fetch(url, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({redirect: false});
        })
        .catch(err => {
            alert("Internal server error, please try again later");
        })
    }
}