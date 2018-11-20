import * as React from "react"
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core"
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
        if (question.diagramURL == ""){
            question.diagramURL == ""
        }
        if (this.state.redirect == true){
            return (<Redirect to={'/problem/'+this.props.question.id} />)
        } else {
            return(
                <Card style={{width: "100%"}}>
                        <CardActionArea onClick={this.goToQuestion}>
                            <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {question.title}
                            </Typography>
                            <Typography component="p">
                                {question.description.length < 20 ? (question.description) : (question.description.substring(0,50)+"...")}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
            )
            
        }

        
    }

    private goToQuestion = () =>{
        this.setState({redirect: true});
    }
}