import React from 'react';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import Image from 'react-image-resizer';
import NavBar from './NavBar';
import {Row, Col} from 'antd';
import {Table,Card, Button, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class Rate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
render() {		
    return (
		<Row className="containerin">
	      <Col push={24}>
            <img src={require('../image/car.jpg')}
              style={{ width: '100%', height: '700px' }}
            />
	        <NavBar /><br/>

          <Row type="flex" justify="center">
            <Col span={4}>
              <Card>
              <CardHeader> Hour / Kilo Meter </CardHeader>
                <CardBody>
                  <Table striped>
                    <tbody>
                      <tr>
                        <th scope="row">3 Hr/ 30 Km</th>
                      </tr>
                      <tr>
                        <th scope="row">4 Hr/ 40 Km</th>
                      </tr>
                      <tr>
                        <th scope="row">6 Hr/ 60 Km</th>
                      </tr>
                      <tr>
                        <th scope="row">8 Hr/ 80 Km</th>
                      </tr>
                      <tr>
                        <th scope="row">10 Hr/ 100 Km</th>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <CardHeader>Delux Car</CardHeader>
                <CardBody>
                <Table striped>
                    <tbody>
                      <tr>
                        <th scope="row"> 5,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 6,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 8,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 10,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 12,000/= </th>
                      </tr>
                    </tbody>
                  </Table>
                  <Button outline color="success" onClick={this.toggle}>{this.props.buttonLabel}Addiional Usage</Button>
                  <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                    toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Addiional Usage</ModalHeader>
                    <ModalBody>
                      <p justify="center"> Addiional Hr : 500/= </p><br/>
                      <p justify="center"> Addiional Km : 65/= </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <CardHeader>Luxury Car</CardHeader>
                <CardBody>
                <Table striped>
                    <tbody>
                      <tr>
                        <th scope="row"> 8,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 10,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 15,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 20,000/= </th>
                      </tr>
                      <tr>
                        <th scope="row"> 25,000/= </th>
                      </tr>
                    </tbody>
                  </Table>
                  <Button outline color="success" onClick={this.toggle}>{this.props.buttonLabel}Addiional Usage</Button>
                  <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                    toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Addiional Usage</ModalHeader>
                    <ModalBody>
                      <p justify="center"> Addiional Hr : 1,000/= </p><br/>
                      <p justify="center"> Addiional Km : 150/= </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
	      </Col >
        
	  </Row>
    
    
      
    );
  }
}
