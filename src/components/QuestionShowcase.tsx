import * as React from "react"
import QuestionItem from "./QuestionItem"
/* 
import * as InfiniteScroll from 'react-infinite-scroller';
 */
interface IState{
    tag: any
    open: boolean
    questions: any
} 

export default class QuestionShowcase extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            tag: "",
            open: false,
            questions: null
        };
    }

    componentDidMount(){
        this.getQuestions();
    }


    render(){
        console.log(this.state.questions);
        if (this.state.questions != null)
        {
            const questionsRender = this.state.questions.map((question:any, i:number)=>{
                return(
                    <div className = "col-md-3 paddingVertical">
                        <QuestionItem question={this.state.questions[i]}/>
                    </div>
                );
            })
            return(
                <div className="row">
                    {questionsRender}
                </div>
            )
        } else {
            return("")
        }
    }
    
    private getQuestions = () =>{
        fetch('https://howdoidothisapixlin928.azurewebsites.net/api/Question', {
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