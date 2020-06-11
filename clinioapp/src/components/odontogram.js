import React from "react";
import {Container, Col, Accordion,Card, Form, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component'; 
import Moment from 'moment';

import OdontogramHeader from '../components/odontogramHeader.js';

import OdontogramPicture from '../assets/img/odontograma.png';
import  '../assets/css/odontogram.css';


const tooths =[
    {id: 11,name:'Incisivo Central Superior Direito'},
    {id: 12,name:'Incisivo Lateral Superior Direito'},
    {id: 13,name:'Canino Superior Direito'},
    {id: 14,name:'Primeiro Premolar Superior Direito'},
    {id: 15,name:'Segundo Premolar Superior Direito'},
    {id: 16,name:'Primeiro Molar Superior Direito'},
    {id: 17,name:'Segundo Molar Superior Direito'},
    {id: 18,name:'Terceiro Molar Superior Direito'},
    {id: 21,name:'Incisivo Central Superior Esquerdo'},
    {id: 22,name:'Incisivo Lateral Superior Esquerdo'},
    {id: 23,name:'Canino Superior Esquerdo'},
    {id: 24,name:'Primeiro Premolar Superior Esquerdo'},
    {id: 25,name:'Segundo Premolar Superior Esquerdo'},
    {id: 26,name:'Primeiro Molar Superior Esquerdo'},
    {id: 27,name:'Segundo Molar Superior Esquerdo'},
    {id: 28,name:'Terceiro Molar Superior Esquerdo'},
    {id: 31,name:'Incisivo Central Inferior Esquerdo'},
    {id: 32,name:'Incisivo Lateral Inferior Esquerdo'},
    {id: 33,name:'Canino Inferior Esquerdo'},
    {id: 34,name:'Primeiro Premolar Inferior Esquerdo'},
    {id: 35,name:'Segundo Premolar Inferior Esquerdo'},
    {id: 36,name:'Primeiro Molar Inferior Esquerdo'},
    {id: 37,name:'Segundo Molar Inferior Esquerdo'},
    {id: 38,name:'Terceiro Molar Inferior Esquerdo'},
    {id: 41,name:'Incisivo Central Inferior Direito'},
    {id: 42,name:'Incisivo Lateral Inferior Direito'},
    {id: 43,name:'Canino Inferior Direito'},
    {id: 44,name:'Primeiro Premolar Inferior Direito'},
    {id: 45,name:'Segundo Premolar Inferior Direito'},
    {id: 46,name:'Primeiro Molar Inferior Direito'},
    {id: 47,name:'Segundo Molar Inferior Direito'},
    {id: 48,name:'Terceiro Molar Inferior Direito'},
]
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
            procedures: this.props.procedures
        };

        this.handleToothClick=this.handleToothClick.bind(this);
    }
    handleToothClick(event){

        console.log(event.target.title);
       
        let _currentTooth = tooths.filter((tooth)=>{
            return tooth.id === parseInt(event.target.title)
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

    componentWillReceiveProps(nextProps){
      
        this.setState({ currentToothStatus: nextProps.currentToothStatus, 
                        preExistingProcedures: nextProps.preExistingProcedures,
                        performedProcedures: nextProps.performedProcedures, 
                        procedures: nextProps.procedures
                    });
     }
     componentDidMount(){
       
         this.setState({procedures: this.props.procedures});
     }

    render(){
        return(
            <>
             <Container className="boxFlex fullheight content" fluid>
                 <Col xs={6}>
                    <img src={OdontogramPicture} useMap="#image-map" alt="Odontograma" />
                    <map name="image-map" >
                        <area onClick={this.handleToothClick} target="" alt="48" title="48" href="#!" coords="62,374,19" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="47" title="47" href="#!" coords="75,411,19" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="46" title="46" href="#!" coords="83,452,18" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="45" title="45" href="#!" coords="96,489,14" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="44" title="44" href="#!" coords="109,519,14" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="43" title="43" href="#!" coords="125,543,15" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="42" title="42" href="#!" coords="155,560,15" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="41" title="41" href="#!" coords="181,568,12" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="31" title="31" href="#!" coords="205,568,12" shape="circle"/>
                        <area  onClick={this.handleToothClick} target="" alt="32" title="32" href="#!" coords="231,558,14" shape="circle"/>
                        <area  onClick={this.handleToothClick} target="" alt="33" title="33" href="#!" coords="259,544,15" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="34" title="34" href="#!" coords="275,519,16" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="35" title="35" href="#!" coords="289,489,14" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="36" title="36" href="#!" coords="299,452,20" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="37" title="37" href="#!" coords="311,411,18" shape="circle"/>
                        <area  onClick={this.handleToothClick} target="" alt="38" title="38" href="#!" coords="322,373,18" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="18" title="18" href="#!" coords="50,257,20" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="17" title="17" href="#!" coords="52,214,21" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="16" title="16" href="#!" coords="60,170,22" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="15" title="15" href="#!" coords="75,132,14" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="14" title="14" href="#!" coords="87,104,16" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="13" title="13" href="#!" coords="102,70,15" shape="circle"/>
                        <area  onClick={this.handleToothClick} target="" alt="12" title="12" href="#!" coords="131,50,14" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="11" title="11" href="#!" coords="170,39,19" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="21" title="21" href="#!" coords="215,42,18" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="22" title="22" href="#!" coords="255,49,16" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="23" title="23" href="#!" coords="283,69,16" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="24" title="24" href="#!" coords="300,102,17" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="25" title="25" href="#!" coords="313,133,13" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="26" title="26" href="#!" coords="326,171,20" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="27" title="27" href="#!" coords="333,215,19" shape="circle"/>
                        <area onClick={this.handleToothClick} target="" alt="28" title="28" href="#!" coords="338,258,18" shape="circle" />
                    </map>
                 </Col>
                 <Col xs={6}>
                    <Card>
                        <Card.Header>Odontograma</Card.Header>
                        {this.state.currentTooth !=='' && 
                                <OdontogramHeader currentTooth={this.state.currentTooth} />
        }
                    </Card>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">Procedimentos Pré-Existentes</Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <div className="addButton">
                                        <Button><i className="fas fa-plus"></i></Button>
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
                                    <div className="addButton">
                                        <Button><i className="fas fa-plus"></i></Button>
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
                                <div className="addButton">
                                        <Button><i className="fas fa-plus"></i></Button>
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