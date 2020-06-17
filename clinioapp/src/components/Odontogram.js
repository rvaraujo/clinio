import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageMapper from 'react-image-mapper';
import {Container, Col, Accordion} from 'react-bootstrap';
import OdontogramHeader from './OdontogramHeader' ;
import GeneralProcedures from './GeneralProcedures' ;
import PerfomedProcedures from './PerformedProcedures' ;
import PreExistingProcedures from './PreExistingProcedures' ;
import {actionTypes} from "../constants/action-types";

import OdontogramPicture from '../assets/img/odontograma.png';

const odontogramMap ={
    name: 'OdontogramMap',
    areas:[
        {name: "48", shape: "circle", coords: [62,374,19]},
        {name: "47", shape: "circle", coords: [75,411,19]},
        {name: "46", shape: "circle", coords: [83,452,18]},
        {name: "45", shape: "circle", coords: [96,489,14]},
        {name: "44", shape: "circle", coords: [109,519,14]},
        {name: "43", shape: "circle", coords: [125,543,15]},
        {name: "42", shape: "circle", coords: [155,560,15]},
        {name: "41", shape: "circle", coords: [181,568,12]},
        {name: "31", shape: "circle", coords: [205,568,12]},
        {name: "32", shape: "circle", coords: [231,558,14]},
        {name: "33", shape: "circle", coords: [259,544,15]},
        {name: "34", shape: "circle", coords: [275,519,16]},
        {name: "35", shape: "circle", coords: [289,489,14]},
        {name: "36", shape: "circle", coords: [299,452,20]},
        {name: "37", shape: "circle", coords: [311,411,18]},
        {name: "38", shape: "circle", coords: [322,373,18]},
        {name: "18", shape: "circle", coords: [50,257,20]},
        {name: "17", shape: "circle", coords: [52,214,21]},
        {name: "16", shape: "circle", coords: [60,170,22]},
        {name: "15", shape: "circle", coords: [75,132,14]},
        {name: "14", shape: "circle", coords: [87,104,16]},
        {name: "13", shape: "circle", coords: [102,70,15]},
        {name: "12", shape: "circle", coords: [131,50,14]},
        {name: "11", shape: "circle", coords: [170,39,19]},
        {name: "21", shape: "circle", coords: [215,42,18]},
        {name: "22", shape: "circle", coords: [255,49,16]},
        {name: "23", shape: "circle", coords: [283,69,16]},
        {name: "24", shape: "circle", coords: [300,102,17]},
        {name: "25", shape: "circle", coords: [313,133,13]},
        {name: "26", shape: "circle", coords: [326,171,20]},
        {name: "27", shape: "circle", coords: [333,215,19]},
        {name: "28", shape: "circle", coords: [338,258,18]}
    ]
};

export  class Odontogram extends Component{
    constructor(props){
        super(props);
        this.handleToothClick=this.handleToothClick.bind(this);
    }

    handleToothClick(e){
        this.props.getToothProcedure(parseInt(e.name));
    }
    render(){
        return (
            <>
                 <Container className="boxFlex fullheight content" fluid>
                    <Col xs={4} className="odontogram">
                        <ImageMapper width={285} imgWidth={385} src={OdontogramPicture} map={odontogramMap} onClick={area => this.handleToothClick(area)} />
                    </Col>
                    <Col xs={8}>
                        <OdontogramHeader />
                        <Accordion>
                            <PreExistingProcedures />
                            <PerfomedProcedures />
                            <GeneralProcedures />
                        </Accordion>
                    </Col>
                 </Container>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getToothProcedure: (toothId) => dispatch({ type: actionTypes.GET_TOOTH_PROCEDURES,payload:toothId })
    }
  }

export default connect(null,mapDispatchToProps)(Odontogram);