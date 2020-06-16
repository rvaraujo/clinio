import React from 'react';
import HeaderInterno from '../components/HeaderInterno';
import {Container, Col} from 'react-bootstrap';
import AppointmentsList from '../components/AppointmentsList';
import PatiendRecord from '../components/PatientRecord';

import "../assets/css/painelDentista.css";

const Atendimento=()=>(
    <>
        <HeaderInterno />
        <Container className="boxFlex fullheight content" fluid>
            <Col xs={9}>
                <PatiendRecord />
            </Col>
            <Col className="paddingzero" xs={3}>
                <AppointmentsList />
            </Col>
        </Container>
    </>
);
export default Atendimento;