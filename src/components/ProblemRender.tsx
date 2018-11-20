import * as React from 'react'

interface IState {
    solutionObjects: any
}

export default class ProblemDetail extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.findSolutions
        this.state = {
            solutionObjects: null
        }
    }

    componentDidMount(){
        this.findSolutions();
    }

    render(){
        if (this.state.solutionObjects!==null){
            return(
                <div>
                    There are {this.state.solutionObjects.length} solutions
                </div>
            )
        }
        return(<div>nothinig</div>)
    }

    private findSolutions = () =>{
        const questionID = this.props.problem.id;
        fetch("https://howdoidothisapixlin928.azurewebsites.net/api/Solution/", {
          method: 'GET'
        })
        .then(res => res.json())
        .then((res: any) => {
            // Find all solutions with current question id
            var count = Object.keys(res).length;
            let solutions:JSON[];
            solutions=[];
            for (var i = 0; i < count; i++){
                if(res[i].questionID === questionID){
                    console.log("Found");
                    solutions.push(res[i]);
                }
            }
            console.log("Solutions:");
            console.log(solutions);
            this.setState({
                solutionObjects: solutions
            })
        })
        .catch(() => {
            console.log("OOPS");
        })
    }
}

