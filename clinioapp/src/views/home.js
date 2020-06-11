import React from "react";
// import {Container, Row, Col, Button,Navbar, Nav, NavItem} from "react-bootstrap";
// import Sidebar from 'react-bootstrap-sidebar';
import { Button, Icon,Menu,Sidebar, Segment, Header,Image, Label  } from 'semantic-ui-react';
import "../assets/css/clinio.css";
import Logo from  "../assets/img/logo_clinio.png" ;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
          isVisible: false,
        };
    }

    render() {
        return (
            <>
            
             <Segment   inverted className="header-clinio">
                 <Image className="logo" src={Logo}></Image>
                 <Label className="logo-text">CLINIO</Label>
             <Button  className="menu-toggle"  onClick={()=>this.setState({isVisible:true})}><Icon name='bars' /></Button>
    </Segment>
               
               <Sidebar.Pushable className="main" as={Segment}>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => this.setState({isVisible:false})}
        vertical
        visible={this.state.isVisible}
        
      >
        <Menu.Item as='a'>
          <Icon name='home' className="menu-icon" />
          Tela Inicial
        </Menu.Item>
        <Menu.Item as='a'>
        <i className="far fa-calendar-check menu-icon"></i>
          Consultas
        </Menu.Item>
        <Menu.Item as='a'>
        <i className="fas fa-user-plus menu-icon"></i>
          Pacientes
        </Menu.Item>
        <Menu.Item as='a'>
        <i className="fas fa-file-invoice-dollar menu-icon"></i>
          Convênios
        </Menu.Item>
        <Menu.Item as='a'>
        <i className="fas fa-id-badge menu-icon"></i>
          Dentistas
        </Menu.Item>
        <Menu.Item as='a'>
        <i className="fas fa-cog menu-icon"></i>
          Configurações
        </Menu.Item>
        <Menu.Item as='a'>
        <i className="fas fa-users menu-icon"></i>
          Usuários
        </Menu.Item>
        <Menu.Item as='a'>
        <i className="fas fa-sign-out-alt menu-icon"></i>
          Sair
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={this.state.isVisible}>
        <Segment basic className="main"> 
          <Header as='h3'>Application Content</Header>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
            </>
        );
    }
}