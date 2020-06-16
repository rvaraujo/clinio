import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGenders} from '../actions/index';

export class Genders extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getGenders();
    }

    render(){
        return (
            <ul>
                {this.props.genders.map(el=>(
                    <li key={el.key}>{el.value}</li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps(state){
    return {
        genders: state.genders
    };
}
export default connect(mapStateToProps,{getGenders})(Genders);

