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
                <div className="row">
                    <h3 className="col-md-8">Search by Tags</h3>
                    <Select 
                        className="col-md-8"
                        options={this.props.suggestions}
                        value={this.state.tag}
                        onChange={this.handleTagChange}
                    />
                    <div className="centreAtSmall">
                        <Button className="col-md-2" onClick={this.props.searchTag}>Search</Button>
                        <Button className="col-md-2" onClick={this.handleClear}>Clear</Button>
                    </div>
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