import * as React from "react"
import Select from 'react-select'
import {Button} from '@material-ui/core'

interface IState{
    tag: any
    open: boolean
} 

export default class QuestionShowcase extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            tag: "",
            open: false
        };
    }