import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getInsurances} from '../actions/index';

export class Insurances extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getInsurances();
    }

    render(){
        return (
            <ul>
                {this.props.insurances.map(el=>(
                    <li key={el.key}>{el.value}</li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps(state){
    return {
        insurances: state.insurances
    };
}
export default connect(mapStateToProps,{getInsurances})(Insurances);

