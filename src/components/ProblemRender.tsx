import * as React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import Chat from '@material-ui/icons/Chat'
import RenderProblemContent from './RenderProblemContent';
import NewAnswerButton from './NewAnswerButton'

interface IState {
    solutionObjects: any,
    selectedIndex: any,
    currentContent: any
}


export default class ProblemRender extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.findSolutions
        this.state = {
            solutionObjects: null,
            selectedIndex: 0,
            currentContent: 0
        }
    }

    componentDidMount(){
        this.findSolutions();
    }

    render(){
        if (this.state.solutionObjects!==null){
            const solutionJSONs = this.state.solutionObjects
            const solutionsRender = solutionJSONs.map((solutionJSON:any, i:number)=>{
                return(
                        <ListItem
                            button
                            selected={this.state.selectedIndex === i+1}
                            onClick={event => this.handleListItemClick(event, i+1)}
                            key={i}
                        >
                            <ListItemIcon>
                            <Chat />
                            </ListItemIcon>
                            <ListItemText primary={"Solution"+ (i+1)} />
                        </ListItem>
                );
            })
            return(
                <div>
                    <NewAnswerButton problemID={this.props.problem.id}/>
                    <div className="container paddingTopBottom"> 
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

                                {solutionsRender}

                                
                            </List>
                            </div>
                            {/* MuiList-padding-2 */}
                            <div className = "col-md-9 ">
                                <RenderProblemContent 
                                    index={this.state.selectedIndex} 
                                    problem={this.props.problem} 
                                    solution={this.state.solutionObjects[this.state.selectedIndex-1]}
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
        }

        // Loading
        return("")
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

