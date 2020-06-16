import React from 'react';
import {Col, Image, Badge} from 'react-bootstrap';

import Logo from '../assets/img/logo_clinio.png';
import Avatar from '../assets/img/avatar.jpg';

const HeaderInterno=()=>(
    <>
        <div className="header">
                <Col className="header-brand">
                    <img className="logo" src={Logo} alt="CLINIO - SISTEMA DE GERENCIAMENTO DE CONSULTÓRIO ODONTOLÓGICO" />
                    <label className="appname">CLINIO</label>
                </Col>
                <Col className="header-content">
                    <i className="far fa-bell incomingmessage"></i><Badge className="header-badge" variant="light">9</Badge>
                    <Image className="avatar" roundedCircle src={Avatar} alt="Usuário Conectado" />
                </Col>
            </div>
    </>
);
export default HeaderInterno;