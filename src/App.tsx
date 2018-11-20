import * as React from 'react';
import './App.css';
import LoginInterface from './components/LoginInterface'
import AddQuestionButton from './components/AddQuestionButton';
import QuestionTagSearchBar from './components/QuestionTagSearchBar';
import QuestionShowcase from './components/QuestionShowcase'


interface IState{
  userInfo: any,
  suggestions: any
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any){
    super(props)
    console.log("CALLED");
    this.state = ({
      userInfo: JSON.parse(localStorage.getItem("user") as string),
      suggestions: ""
    })
    this.getTags();
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
          <QuestionTagSearchBar userInfo={this.state.userInfo} suggestions={this.state.suggestions}/>}
          <QuestionShowcase/>
        </div>
      )
    }
  }

  private onLogin = (userInfo: any) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
    this.setState({userInfo});
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
}
