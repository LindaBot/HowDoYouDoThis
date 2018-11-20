import * as React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import Chat from '@material-ui/icons/Chat'

interface IState {
    solutionObjects: any,
    selectedIndex: any
}

export default class ProblemDetail extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.findSolutions
        this.state = {
            solutionObjects: null,
            selectedIndex: 0
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
                    <div className="container"> 
                        <div className="row">
                            <div className = "col-md-3">
                            <List component="nav">
                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 0}
                                    onClick={event => this.handleListItemClick(event, 0)}
                                >
                                    <ListItemIcon>
                                    <QuestionAnswer />
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                </ListItem>

                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 1}
                                    onClick={event => this.handleListItemClick(event, 1)}
                                >
                                    <ListItemIcon>
                                    <Chat />
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                </ListItem>
                            </List>
                            </div>
                            <div className = "col-md-9">
                                Hello
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(<div>Loading</div>)
    }

    private handleListItemClick = (e:any, i:any) => {
        this.setState({selectedIndex:i})
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

