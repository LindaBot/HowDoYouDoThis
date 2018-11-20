import * as React from 'react';
import './App.css';
import LoginInterface from './components/LoginInterface'
import AddQuestionButton from './components/AddQuestionButton';
import QuestionTagSearchBar from './components/QuestionTagSearchBar';
import QuestionShowcase from './components/QuestionShowcase'


interface IState{
  userInfo: any,
  suggestions: any,
  currentTag: any,
  questions: any
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any){
    super(props)
    console.log("CALLED");
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
        <div className="mainContent">
          Hello, {this.state.userInfo.firstName}
          <button onClick={this.onLogout}>Logout</button>
          <AddQuestionButton suggestions={this.state.suggestions} />
          {this.state.suggestions === "" ? 
          <div>No Search is available right now</div> 
          : 
          <QuestionTagSearchBar userInfo={this.state.userInfo} suggestions={this.state.suggestions} onChange={this.handleChangeTag} searchTag={this.getQuestions}clearTags={this.clearTags}/>}
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

  private onLogout = () => {
    localStorage.removeItem("user");
    this.setState({userInfo: null});
  }

  private getTags = () => {
      fetch("https://howdoidothisapixlin928.azurewebsites.net/api/question/tag", {
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
        url = "https://howdoidothisapixlin928.azurewebsites.net/api/Question"
    } else {
        console.log("TAG")
        console.log(this.state.currentTag);
        url = ("https://howdoidothisapixlin928.azurewebsites.net/api/Question/tag/" + this.state.currentTag.value)
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
            console.log(json)
            json.reverse();
            this.setState({questions: json});
        })
}
}
