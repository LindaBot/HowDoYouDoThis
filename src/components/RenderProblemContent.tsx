import * as React from 'react'
import {Paper, Button} from '@material-ui/core'

interface IState {
    num: any,
    upVoted: any
}

export default class RenderProblemContent extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            num:1,
            upVoted: false
        }
    }


    render(){
        const problem = this.props.problem;
        if (this.props.index===0){
            return(
                <Paper className="problemDescription">
                    <div className="problemDescription">
                        <h5 className="alignRight"> Tag: {problem.tag} </h5>
                        <h2> <b>{problem.title} </b> </h2>
                        <h3> {problem.description} </h3>
                        <img src={problem.diagramURL} className="maxWidth100"/>
                    </div>
                </Paper>
            )
        } else {
            const solution = this.props.solution;
            return(
                <Paper className="problemDescription">
                    <div className="problemDescription">
                        <h2> <b>{solution.answer} </b> </h2>
                        <h3> {solution.description} </h3>
                        <img src={solution.workingImage} className="maxWidth100"/>
                    </div>
                    <div className="alignRight">
                        <Button onClick={this.handleUpVote} disabled={this.state.upVoted}>Upvote</Button>{solution.upvotes}
                    </div>
                </Paper>
            )
        }
    }

    private handleUpVote = () =>{
        const solutionObject = this.props.solution;
        solutionObject.upvotes = solutionObject.upvotes+1;
        let postJSON = JSON.stringify(solutionObject);
        postJSON = JSON.parse(postJSON);
        console.log(typeof(postJSON));
        console.log(postJSON); 
        fetch('https://howdoidothisapixlin928.azurewebsites.net/api/Solution/'+solutionObject.id, {
            method: "PUT",
            body: JSON.stringify(postJSON),
            headers: {"Content-Type": "application/json"}
        })
        .then((res: any) =>{
            console.log(res)
            this.setState({upVoted: true});
        })
    }
}