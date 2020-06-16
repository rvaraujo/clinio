import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

export class PatientRecordActionBar extends Component{
    constructor(props){
        super(props);

        this.renderActionBar=this.renderActionBar.bind(this);
    }

    renderActionBar(){
        if(this.props.currentPatientRecord === '')
            return <div className="action-bar">
            <Button variant="info"><i className="far fa-calendar-check"></i>Marcar Consulta</Button>
        </div>
        else
            return <div className="action-bar">
            <Button variant="info"><i className="fas fa-microphone-alt"></i>Chamar Paciente</Button>
            <Button variant="info"><i className="fas fa-file-medical-alt"></i> Emitir Receita</Button>
            <Button variant="info"><i className="fas fa-notes-medical"></i>Emitir Atestado</Button>
            <Button variant="info"><i className="far fa-calendar-check"></i>Agendar Retorno</Button>
            <Button variant="info" onClick={this.props.closeMedicalRecord}><i className="far fa-window-close"></i>Fechar Prontuário</Button>
        </div>
    }

    render(){
        return(
            <>
                {this.renderActionBar()}
            </>
        );
    }

}

function mapStateToProps(state){
    return {
        currentPatientRecord: state.currentPatientRecord
    };
}

export default connect(mapStateToProps,null)(PatientRecordActionBar);