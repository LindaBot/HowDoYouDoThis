import * as React from 'react'
import {Paper, Button} from '@material-ui/core'
import * as utf8 from 'utf8'
import NewQuestionEditButton from './NewQuestionEditButton';

interface IState {
    num: any,
    upVoted: any,
    questionAuthor: any,
    user: any
}

export default class RenderProblemContent extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            num:1,
            upVoted: false,
            questionAuthor: "",
            user: ""
        }
    }

    componentDidMount(){
        // To be ran on initiation to change the state
        this.getQuestionAuthor();
        this.setState({user: JSON.parse(localStorage.getItem("user") as string)})
    }


    render(){
        const problem = this.props.problem;
        const url = utf8.encode(window.location.href);
        const admin = this.state.user.admin;
        const userID = this.state.user.id;
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
                        <h3 className="breakWord"> <b>{problem.title} </b> </h3> <br/>
                        <h4 className="breakWord"> {problem.description} </h4>
                        <img src={problem.diagramURL} className="maxWidth100"/>
                        <div className="alignRight">
                            <p>
                                Question submitted by: {this.state.questionAuthor}
                            </p>
                            {admin || userID === this.props.problem.authorID ?(<NewQuestionEditButton problem={this.props.problem}/>):null}
                        </div>
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
                        <Button onClick={this.handleUpVote} disabled={this.state.upVoted} variant="contained">Upvote</Button>  &#160;&#160;&#160;  {solution.upvotes}
                        <br/>
                    {admin || userID === this.props.solution.authorID ?(<div className="alignRight"><Button onClick={this.handleSolutionDelete} variant="contained" color="secondary">DELETE</Button></div>):null} 
                    </div>
                </Paper>
            )
        }
    }

    private handleSolutionDelete = () =>{
        const solutionObject = this.props.solution[this.props.index-1];
        fetch('https://howdoyoudothisapi.azurewebsites.net/api/Solution/' + solutionObject.id, {
            method: "DELETE"
        })
        .then((res: any) => {
            alert("DELETED")
            location.reload();
        })
    }

    private handleUpVote = () =>{
        const solutionObject = this.props.solution[this.props.index-1];
        solutionObject.upvotes = solutionObject.upvotes+1;
        let postJSON = JSON.stringify(solutionObject);
        postJSON = JSON.parse(postJSON);
        //console.log(typeof(postJSON));
        //console.log(postJSON); 
        fetch('https://howdoyoudothisapi.azurewebsites.net/api/Solution/'+solutionObject.id, {
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
        const url = "https://howdoyoudothisapi.azurewebsites.net/api/User/" + this.props.problem.authorID;
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