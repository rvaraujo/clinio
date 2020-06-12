import React from "react";
import {Form,Row, Col, Button, Alert} from 'react-bootstrap';
export default class ToothProcedure extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={
            tooth:this.props.tooth,
            patientId: this.props.patientId,
            message:'',
            procedure:'',
            comments:'',
            showErrorMessage:false,
            showSuccessMessage:false,
            blockSave:false
        };

        this.handleSave=this.handleSave.bind(this);
        this.clearError=this.clearError.bind(this);
        this.renderToothControl=this.renderToothControl.bind(this);
    }

    clearError(){
        this.setState({message:'',showErrorMessage:false,showSuccessMessage:false});
    }

    handleSave(){
        var self = this;
        this.clearError();
        if(this.state.procedure === undefined || this.state.procedure ===''){
            this.setState({message:'Informe o procedimento realizado', showErrorMessage:true});
        }else{
            let result = this.props.showTooth?this.props.saveAction(this.state.tooth.id,this.state.patientId, this.state.procedure,this.state.comments):this.props.saveAction(this.state.patientId, this.state.procedure,this.state.comments);
            console.log(result);
            this.setState({blockSave:result.isSuccess,showErrorMessage:!result.isSuccess,showSuccessMessage:result.isSuccess,message:result.message},
                function(){
                    setTimeout(() => {
                        this.props.closeForm();
                      }, 3000);
                });
        }

    }

    renderToothControl(show){
        if(show)
            return <Form.Group as={Row}>
            <Form.Label column sm={2}>Dente</Form.Label>
            <Col sm={10}>
                <Form.Control type="text" value={`${this.state.tooth.id} - ${this.state.tooth.name}`} readOnly />
            </Col>
        </Form.Group>;
    }

    render(){
        return(
            <>
            <Alert show={this.state.showErrorMessage} variant="warning">{this.state.message}</Alert>
            <Alert show={this.state.showSuccessMessage} variant="success">{this.state.message}</Alert>
            <Form>

                {this.renderToothControl(this.props.showTooth)}
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Procedimento</Form.Label>
                    <Col sm={10}>
                    <Form.Control   as="select" 
                                    onChange={(e)=>{
                                        this.clearError();
                                        this.setState({procedure:e.target.value });
                                    }}
                                    required>
                                <option value={''}>Selecione...</option>
                                <option value="1">Consulta inicial</option>
                                <option value="2">Exame histopatológico</option>
                                <option value="3">Fluorterapia</option>
                                <option value="4">Aplicação de selante</option>
                                <option value="5">Restauração de 2 (duas) faces</option>
                                <option value="6">Ajuste oclusal </option>
                            </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Observações</Form.Label>
                    <Col sm={10}>
                    <Form.Control   as="textarea"
                                    onChange={(e)=>{
                                        this.clearError();
                                        this.setState({comments:e.target.value});
                                        }}/>  
                    </Col>
                </Form.Group>
                <hr/>
                <Button disabled={this.state.blockSave} onClick={this.handleSave}>Salvar</Button>
                <Button className="margin-left-10" variant="secondary" onClick={this.props.closeForm}>Cancelar</Button>
            </Form>
           
            </>
        );
    }
}