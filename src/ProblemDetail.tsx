import * as React from 'react'
import ProblemRender from './components/ProblemRender'
import { Redirect } from 'react-router-dom'

interface IState {
    problemObject: any
    userObject: any
}

export default class ProblemDetail extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            problemObject: "Loading",
            userObject: "Loading"
        }
        console.log("MOUNTING");
        
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        
        console.log(this.state)
        return(
            this.state.problemObject==="Loading" && this.state.problemObject==="Loading" ?
            // Loading
            <div/>
            :
            this.state.userObject=== null ? 
            
            <div>
                return <Redirect to='/' />
            </div>
             
            : 
            
            this.state.problemObject === null ?
            <div>
                Problem does not exist
            </div>

            :

            // Actual content
            <div>
                <ProblemRender problem={this.state.problemObject}/>
            </div>
            
            
        )
    }

    private fetchData = () =>{
        const userObject = JSON.parse(localStorage.getItem("user") as string)
        if (userObject === null){
            this.setState({userObject: null});
        } else {
            this.setState({userObject: userObject});
        }
        console.log(userObject);

        fetch("https://howdoidothisapixlin928.azurewebsites.net/api/Question/" + this.props.match.params.id, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(questionJSON =>{
            console.log(questionJSON);
            this.setState({
                problemObject: questionJSON
            })
        })
        .catch(e => {
            // Problem does not exist
            console.log("Problem does not exist");
            this.setState({
                problemObject: null
            })
        })
    }
}