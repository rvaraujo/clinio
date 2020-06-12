import React from "react";
import {Container, Col, Accordion,Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component'; 
import Moment from 'moment';
import ImageMapper from 'react-image-mapper';
import ParametersService from '../services/parametersService.js';
import OdontogramHeader from '../components/odontogramHeader.js';

import OdontogramPicture from '../assets/img/odontograma.png';
import  '../assets/css/odontogram.css';


// const tooths =[
//     {id: 11,name:'Incisivo Central Superior Direito'},
//     {id: 12,name:'Incisivo Lateral Superior Direito'},
//     {id: 13,name:'Canino Superior Direito'},
//     {id: 14,name:'Primeiro Premolar Superior Direito'},
//     {id: 15,name:'Segundo Premolar Superior Direito'},
//     {id: 16,name:'Primeiro Molar Superior Direito'},
//     {id: 17,name:'Segundo Molar Superior Direito'},
//     {id: 18,name:'Terceiro Molar Superior Direito'},
//     {id: 21,name:'Incisivo Central Superior Esquerdo'},
//     {id: 22,name:'Incisivo Lateral Superior Esquerdo'},
//     {id: 23,name:'Canino Superior Esquerdo'},
//     {id: 24,name:'Primeiro Premolar Superior Esquerdo'},
//     {id: 25,name:'Segundo Premolar Superior Esquerdo'},
//     {id: 26,name:'Primeiro Molar Superior Esquerdo'},
//     {id: 27,name:'Segundo Molar Superior Esquerdo'},
//     {id: 28,name:'Terceiro Molar Superior Esquerdo'},
//     {id: 31,name:'Incisivo Central Inferior Esquerdo'},
//     {id: 32,name:'Incisivo Lateral Inferior Esquerdo'},
//     {id: 33,name:'Canino Inferior Esquerdo'},
//     {id: 34,name:'Primeiro Premolar Inferior Esquerdo'},
//     {id: 35,name:'Segundo Premolar Inferior Esquerdo'},
//     {id: 36,name:'Primeiro Molar Inferior Esquerdo'},
//     {id: 37,name:'Segundo Molar Inferior Esquerdo'},
//     {id: 38,name:'Terceiro Molar Inferior Esquerdo'},
//     {id: 41,name:'Incisivo Central Inferior Direito'},
//     {id: 42,name:'Incisivo Lateral Inferior Direito'},
//     {id: 43,name:'Canino Inferior Direito'},
//     {id: 44,name:'Primeiro Premolar Inferior Direito'},
//     {id: 45,name:'Segundo Premolar Inferior Direito'},
//     {id: 46,name:'Primeiro Molar Inferior Direito'},
//     {id: 47,name:'Segundo Molar Inferior Direito'},
//     {id: 48,name:'Terceiro Molar Inferior Direito'},
// ]

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

const columnsPreExistingProcedures = [
    {
      name: '',
      selector: 'toothId',
      omit: true
    },
    {
      name: '',
      selector: 'description',
      cell:row=><div style={{whiteSpace:'break-spaces'}}>{row.description}</div>
    }
  ];

const columnsProceduresPerformed = [
    {
      name: '',
      selector: 'toothId',
      omit:true
    },
    {
        name: '',
        selector: 'date',
        cell: row=> Moment(row.date).format('DD/MM/yyyy'),
        maxWidth:'110px',
        minWidth:'110px',
      },
    {
      name: '',
      selector: 'description',
      cell:row=><div style={{whiteSpace:'break-spaces'}}>{row.description}</div>
    },
    {
        name: '',
        selector: 'doctor'
      }
  ];

  const columnsProcedures = [
    {
        name: '',
        selector: 'date',
        cell: row=> Moment(row.date).format('DD/MM/yyyy')
      },
    {
      name: '',
      selector: 'description',
    cell:row=><div style={{whiteSpace:'break-spaces'}}>{row.description}</div>
     
    },
    {
        name: '',
        selector: 'doctor'
      }
  ];



export default class Odontogram extends React.Component {
    constructor(props) {
        super(props);

      

        this.state={
            currentTooth:'',
            currentToothStatus:this.props.currentToothStatus,
            preExistingProcedures: this.props.preExistingProcedures,
            performedProcedures: this.props.performedProcedures,
            procedures: this.props.procedures,
            tooths:[]
        };

        this.handleToothClick=this.handleToothClick.bind(this);
        
    }
    handleToothClick(event){

        let _currentTooth = this.state.tooths.filter((tooth)=>{
            return tooth.id === parseInt(event.name)
        });

        let toothStatus  = this.state.currentToothStatus === undefined?[]:this.state.currentToothStatus.filter((tooth)=>{
            return tooth.id ===_currentTooth[0].id
        });

        
        let toothPreExistingProcedures = this.state.preExistingProcedures===undefined?[]:this.state.preExistingProcedures.filter((procedure)=>{
            return procedure.toothId === _currentTooth[0].id;
        });

        let toothPerformedProcedures = this.state.performedProcedures===undefined?[]:this.state.performedProcedures.filter((procedure)=>{
            return procedure.toothId === _currentTooth[0].id;
        });

        

        let _tooth = toothStatus.length> 0?toothStatus[0]:{absent:false, damaged: false, recovered:false, implanted:false, preExistingProcedures: toothPreExistingProcedures, performedProcedures: toothPerformedProcedures};

        this.setState({currentTooth: {..._currentTooth[0], absent:_tooth.absent, damaged: _tooth.damaged, recovered: _tooth.recovered, implanted: _tooth.implanted,preExistingProcedures: toothPreExistingProcedures,performedProcedures: toothPerformedProcedures}});
    }

    static getDerivedStateFromProps(props, state){
        return {procedures: props.procedures,performedProcedures:props.performedProcedures};
        
    }

     componentDidMount(){
        var self = this;
        ParametersService.getTooths().then(function(res){
            let _tooths= res.map((item)=>{
                return {id:item.key, name:item.value};
            });
            self.setState({tooths:_tooths,procedures: self.props.procedures,performedProcedures:self.props.performedProcedures});
        });
        // this.setState({procedures: this.props.procedures,performedProcedures:this.props.performedProcedures});
     }

     

    render(){
        return(
            <>
             <Container className="boxFlex fullheight content" fluid>
                 <Col xs={6} className="odontogram">
                     <ImageMapper width={285} imgWidth={385} src={OdontogramPicture} map={odontogramMap} onClick={area => this.handleToothClick(area)} />
                 </Col>
                 <Col xs={6}>
                    <Card>
                        <Card.Header>Odontograma</Card.Header>
                        {this.state.currentTooth !=='' && 
                                <OdontogramHeader currentTooth={this.state.currentTooth} />
        }
                    </Card>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">Procedimentos Pré-Existentes</Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <div className="add-button-area">
                                        <Button className="add-button" onClick={()=>{this.props.openAddPreExistingProcedureForm(this.state.currentTooth)}}><i className="fas fa-plus"></i></Button>
                                    </div>
                                <DataTable  
                                    noDataComponent="Nenhum procedimento registrado"
                                    noHeader={true}
                                    noTableHead={true}
                                    columns={columnsPreExistingProcedures}
                                    data={this.state.currentTooth.preExistingProcedures}
                                     />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">Procedimentos Realizados</Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <div className="add-button-area">
                                        <Button className="add-button" onClick={()=>{this.props.openAddPerformedProcedureForm(this.state.currentTooth)}}><i className="fas fa-plus"></i></Button>
                                    </div>
                                    <DataTable  
                                        noDataComponent="Nenhum procedimento registrado"
                                        noHeader={true}
                                        noTableHead={true}
                                        columns={columnsProceduresPerformed}
                                        data={this.state.currentTooth.performedProcedures}
                                        />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">Procedimentos Gerais Realizados</Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                <div className="add-button-area">
                                        <Button className="add-button" onClick={this.props.openAddGeneralProcedureForm}><i className="fas fa-plus"></i></Button>
                                    </div>
                                    <DataTable  
                                            noDataComponent="Nenhum procedimento registrado"
                                            noHeader={true}
                                            noTableHead={true}
                                            columns={columnsProcedures}
                                            data={this.state.procedures}
                                            />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                 </Col>
             </Container>
               
            </>
        );
    }
}