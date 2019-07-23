import * as React from 'react';
import './App.css';
import LoginInterface from './components/LoginInterface'
import AddQuestionButton from './components/AddQuestionButton';
import QuestionTagSearchBar from './components/QuestionTagSearchBar';
import QuestionShowcase from './components/QuestionShowcase'
import NewSettingButton from './components/NewSettingButton'
import {Paper} from '@material-ui/core'


interface IState{
  userInfo: any,
  suggestions: any,
  currentTag: any,
  questions: any
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any){
    super(props)
    //console.log("CALLED");
    this.state = ({
      userInfo: JSON.parse(localStorage.getItem("user") as string),
      suggestions: "",
      currentTag: "",
      questions: ""
    })
    this.getTags();
  }

  componentDidMount(){
    this.getQuestions();
  }

  public render() {
    const {userInfo} = this.state;

    if (userInfo === "" || userInfo === null){
      return (
          <div className="container-fluid">
            <div className="centreText">
              <LoginInterface onLogin={this.onLogin}/>
            </div>
            
          </div>
          
        );
    } else {
      return (
        <div className="container">
          <Paper style={{minHeight: "50px", height: "100%", backgroundColor:"black"}}>
            <div style={{height: "100% !important", width:"100% !important", backgroundColor:"white"}} className="alignRight">
              Hello {this.state.userInfo.firstName}, Welcome to HowDoYouDoThis
              <NewSettingButton className="alignRight"/>
            </div>
          
          </Paper>
          
          <AddQuestionButton suggestions={this.state.suggestions} />
          {this.state.suggestions === "" ? 
          <div>Please wait while the website is waking up from hibernation</div> 
          : 
          <QuestionTagSearchBar userInfo={this.state.userInfo} suggestions={this.state.suggestions} onChange={this.handleChangeTag} searchTag={this.getQuestions} clearTags={this.clearTags}/>}
          {this.state.questions === "" ? "" : <QuestionShowcase tag={this.state.currentTag} questions={this.state.questions}/>}
        </div>
      )
    }
  }

  private onLogin = (userInfo: any) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
    this.setState({userInfo});
  }

  private clearTags = () =>{
    this.setState({currentTag: ""}, ()=>{this.getQuestions()});
  }

  private handleChangeTag = (tag: any) => {
    this.setState({currentTag: tag});
  }

  private getTags = () => {
      fetch("https://howdoyoudothisapi.azurewebsites.net/api/question/tag", {
          method: 'GET'
      })
      .then(res => res.json())
      .then(suggestions =>{
          const tags = suggestions.map((suggestion:any, i:any) => ({
                      value: suggestion,
                      label: suggestion
                  }));
          this.setState({suggestions: tags});
      })
  }

  public getQuestions = () =>{
    let url;
    if (this.state.currentTag === ""){
        url = "https://howdoyoudothisapi.azurewebsites.net/api/Question"
    } else {
        //console.log("TAG")
        //console.log(this.state.currentTag);
        url = ("https://howdoyoudothisapi.azurewebsites.net/api/Question/tag/" + this.state.currentTag.value)
    }
        fetch(url, {
            // body: userData,
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': "*",
            }
        })
        .then(res => res.json()) 
        .then(json => {
            //console.log(json)
            json.reverse();
            this.setState({questions: json});
        })
}
}
