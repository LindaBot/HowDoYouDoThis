import * as React from "react"

interface IState{
    open: boolean
} 

export default class QuestionTagSearchBar extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            open: false
        };
    }

    render(){
        return(
            <div>
                <p>hello</p>
            </div>
        )
    }

}