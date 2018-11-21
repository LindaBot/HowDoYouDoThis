import * as React from 'react'
import {Paper, Button} from '@material-ui/core'
import * as utf8 from 'utf8'

interface IState {
    num: any,
    upVoted: any,
    questionAuthor: any,
    users: any
}

export default class RenderProblemContent extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            num:1,
            upVoted: false,
            questionAuthor: "",
            users: ""
        }
    }

    componentDidMount(){
        this.getQuestionAuthor();
    }


    render(){
        const problem = this.props.problem;
        const url = utf8.encode(window.location.href);
        if (this.props.index===0){
            return(
                <Paper className="problemDescription">
                    <div className="problemDescription">
                    
                        <h5 className="alignRight"> 
                            <iframe src={"https://www.facebook.com/plugins/share_button.php?href="
                                            +url+
                                            "&layout=button_count&size=small&mobile_iframe=true&appId=254085718606555&width=88&height=20"} 
                                            width="88" height="20" scrolling="no" 
                                            frameBorder="0"
                                            allow="encrypted-media"/>
                            <br/>
                            Tag: {problem.tag} 
                        </h5>
                        <h3> <b>{problem.title} </b> </h3> <br/>
                        <h4> {problem.description} </h4>
                        <img src={problem.diagramURL} className="maxWidth100"/>
                        <p className="alignRight">Question submitted by: {this.state.questionAuthor}</p>
                    </div>
                </Paper>
            )
        } else {
            const solution = this.props.solution[this.props.index-1];
            const userJSON = JSON.parse(localStorage.getItem("user") as string);
            const admin = userJSON.admin
            const userID = userJSON.id
            return(
                <Paper className="problemDescription">
                    <div className="problemDescription">
                        <h2> <b>{solution.answer} </b> </h2>
                        <h3> {solution.description} </h3>
                        <img src={solution.workingImage} className="maxWidth100"/>
                    </div>
                    <div>
                        <Button onClick={this.handleUpVote} disabled={this.state.upVoted}>Upvote</Button>{solution.upvotes}
                        <br/>
                    {admin || userID === this.props.solution.authorID ?(<Button onClick={this.handleSolutionDelete} color="secondary">DELETE</Button>):null} 
                    </div>
                </Paper>
            )
        }
    }

    private handleSolutionDelete = () =>{
        const solutionObject = this.props.solution;
        fetch('https://howdoidothisapixlin928.azurewebsites.net/api/Solution/'+solutionObject.id, {
            method: "DELETE"
        })
        .then((res: any) => {
            alert("DELETED")
            location.reload();
        })
    }

    private handleUpVote = () =>{
        const solutionObject = this.props.solution;
        solutionObject.upvotes = solutionObject.upvotes+1;
        let postJSON = JSON.stringify(solutionObject);
        postJSON = JSON.parse(postJSON);
        //console.log(typeof(postJSON));
        //console.log(postJSON); 
        fetch('https://howdoidothisapixlin928.azurewebsites.net/api/Solution/'+solutionObject.id, {
            method: "PUT",
            body: JSON.stringify(postJSON),
            headers: {"Content-Type": "application/json"}
        })
        .then((res: any) =>{
            //console.log(res)
            this.setState({upVoted: true});
        })
    }

    private getQuestionAuthor = () =>{
        const url = "https://howdoidothisapixlin928.azurewebsites.net/api/User/" + this.props.problem.authorID;
        //console.log(url);
        fetch(url, {
            method: "GET"
        })
        .then(res => res.json())
        .then(user => {
            const name = user.firstName + " " + user.lastName
            this.setState({questionAuthor: name});
        })
        .catch(err => {
            this.setState({questionAuthor: "User Deleted"});
        })
    }
}