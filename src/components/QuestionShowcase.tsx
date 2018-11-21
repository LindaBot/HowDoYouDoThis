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

    render(){
        const questions = this.props.questions;
        console.log("QUESTIONS");
        console.log(typeof(questions));
        if (questions != null || questions != "")
        {
            const questionsRender = questions.map((question:any, i:number)=>{
                return(
                    <div className = "col-md-4 row-eq-height paddingVertical tableCell" key={i}>
                        <QuestionItem question={question}/>
                    </div>
                );
            })
            return(
                <div className="row table">
                    {questionsRender}
                </div>
            )
        } else {
            return
        }
    }
    
}