import * as React from "react"
import Select from 'react-select'
import {Button} from '@material-ui/core'

interface IState{
    tag: any
    open: boolean
} 

export default class QuestionTagSearchBar extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            tag: "",
            open: false
        };
    }

    render(){
        return(
            <div>
                <h3>Search by Tags</h3>
                <div className="autoMargin">
                <Select 
                    className="selectBar"
                    options={this.props.suggestions}
                    value={this.state.tag}
                    onChange={this.handleTagChange}
                />
                <Button className="selectButton" onClick={this.props.searchTag}>Search</Button>
                <Button className="selectButton" onClick={this.handleClear}>Clear</Button>
                </div>
            </div>
        )
    }

     private handleTagChange = (e:any) => {
        this.setState({tag: e});
        this.props.onChange(e)
    }

    private handleClear = () =>{
        this.setState({tag: ""});
        this.props.clearTags()
    }
 
}