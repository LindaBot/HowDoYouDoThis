import * as React from 'react';
import './App.css';
import LoginInterface from './components/LoginInterface'
import AddQuestionButton from './components/AddQuestionButton';

interface IState{
  userInfo: any
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any){
    super(props)
    console.log("CALLED");
    this.state = ({
      userInfo: JSON.parse(localStorage.getItem("user") as string)
    })
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
        <div>
          Hello, {this.state.userInfo.firstName}
          <button onClick={this.onLogout}>Logout</button>
          <AddQuestionButton />
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
}
