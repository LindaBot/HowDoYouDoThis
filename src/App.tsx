import * as React from 'react';
import './App.css';
import LoginInterface from './components/LoginInterface'

interface IState{
  userInfo: any
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any){
    super(props)
    this.state = ({
      userInfo: "null"
    })
  }

  public render() {
    const {userInfo} = this.state;
    if (userInfo === "null"){
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
          Hello, {this.state.userInfo.name}
        </div>
      )
    }
  }

  private onLogin = (userInfo: any) => {
    this.setState({userInfo});
  }
}
