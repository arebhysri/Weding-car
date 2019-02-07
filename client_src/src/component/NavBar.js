import React, {Component} from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';
import ResizeImage from 'react-resize-image';
import { Row, Col,Alert,Modal, Button ,Tabs,Icon} from 'antd';
import Login from './Login';
import Register from './Register';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLoggedIn : false,
      dataUser : localStorage.getItem('data'),
      show : true
    };

  }
  componentWillMount() {
    if (localStorage.getItem('data'))
      this.state.isLoggedIn;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handlelogin = () => {
    this.setState({
      isLoggedIn : true

    })
  }

  handleLogout =() => {
    this.setState({
      isLoggedIn: false,
    });
    localStorage.clear();
    window.location.href = 'http://localhost:3001';
  }

  toggleDiv = () => {
    const {show } = this.state;
    this.setState({ show : !show })
  }

error() {
  Modal.error({
    title: 'Hey..! You are not yet login',
    content: 'Please login',
  });
}

  render() {
    if (localStorage.getItem('data')===null) {
      return (
        <Row className="vert-align">
        <Col push={24}>
        <div>
          <Navbar color="light" white="true" expand="md">
            <NavbarBrand href="/">
            <ResizeImage
              src={require('../image/logo.png')}
              alt="logo"
              
            />
        </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Car">All Cars</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Rate">Rates</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/About">About Us</NavLink>
                </NavItem>
                <NavItem>
                <NavLink style={{color:'#fff'}} onClick={this.error}><Icon type="team" />  Become a Partner</NavLink>
                </NavItem>
                
                <div>
                  <Button type="default" onClick={this.showModal}>
                    <Icon type="login" />login
                  </Button>
                  
                  <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                  >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                      <TabPane tab="Login" key="1"><Login  handlelogin={this.handlelogin} />
                      </TabPane>
                      <TabPane tab="Register" key="2"><Register/></TabPane>
                    </Tabs>
                  </Modal>               
                </div>

              </Nav>
            </Collapse>
          </Navbar> 
        </div>
        </Col >
        </Row >
      );
    }
    else{
      return (
        <Row className="vert-align">
        <Col push={24}>
        <div>
          <Navbar color="light" white="true" expand="md">
            <NavbarBrand href="/">
            <ResizeImage
              src={require('../image/logo.png')}
              alt="logo"
              
            />
        </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Car">All Cars</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Rate">Rates</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/About">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/BecomePartner"><Icon type="team" />  Become a Partner</NavLink>
                </NavItem>
                <div>
                  <div style={{ color: '#fff'}} >{ localStorage.getItem('data')}</div>
                  <Button type="default" onClick={this.handleLogout}>
                    <Icon type="login" />logout
                  </Button>              
                </div>
              </Nav>
            </Collapse>
          </Navbar> 
        </div>
        </Col >
        </Row >
      );


      
    }
  }
}