import * as React from 'react';
import './App.css';
import LoginInterface from './components/LoginInterface'

interface IState{
  userID: string
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any){
    super(props)
    this.state = ({
      userID: "null"
    })
  }

  public render() {
    const {userID} = this.state;
    if (userID === "null"){
      return (
          <div className="container-fluid">
            <div className="centreText">
              <LoginInterface userID={this.state.userID}/>
            </div>
          </div>
        );
    } else {
      return (
        <div>
          Good
        </div>
      )
    }
  }
}