import * as React from 'react'
import {Paper} from '@material-ui/core'

interface IState {
    num: any
}

export default class RenderProblemContent extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            num:1
        }
    }

    render(){
        const problem = this.props.problem;
        if (this.props.index===0){
            return(
                <Paper className="problemDescription">
                    <div className="problemDescription">
                        <h5 className="alignRight"> Tag: {problem.tag} </h5>
                        <h2> <b>{problem.title} </b> </h2>
                        <h3> {problem.description} </h3>
                        <img src={problem.diagramURL} className="maxWidth100"/>
                    </div>
                </Paper>
            )
        } else {
            const solution = this.props.solution;
            return(
                <Paper className="problemDescription">
                    <div className="problemDescription">
                        <h2> <b>{solution.answer} </b> </h2>
                        <h3> {solution.description} </h3>
                        <img src={solution.workingImage} className="maxWidth100"/>
                    </div>
                </Paper>
            )
        }
    }
}