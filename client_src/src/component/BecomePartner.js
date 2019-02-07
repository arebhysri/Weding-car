import React from 'react';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { Breadcrumb, Icon ,Row, Col} from 'antd';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class BecomePartner extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      modal1: false,
	      modal: false
	    };

	    this.toggle1 = this.toggle1.bind(this);
	    this.toggle = this.toggle.bind(this);
	}
	toggle1() {
	    this.setState({
	      modal1: !this.state.modal1
	    });
	}
	toggle() {
	    this.setState({
	      modal: !this.state.modal
	    });
	}
  	render() {
		const wellStyles = { maxWidth: 400, margin: '0 auto 10px' }; 
		 		
    	return (
    	  <Row className="containerin">
	      <Col push={24}>
	      <div>
	          <NavBar />
	          <div>
	          	<Breadcrumb style={{textAlign : 'justify' ,padding:'30px'}}>
				    <Breadcrumb.Item href="/">
				      <Icon type="home" />
				    </Breadcrumb.Item>
				    <Breadcrumb.Item>
				      Become Partner
				    </Breadcrumb.Item>
				</Breadcrumb>
	          	<br />
	          	<h3 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}> We're serious about letting you experience the quality </h3>
	          </div>
	          <div>
	          	<Row>
	      			<Col span={14} offset={4}>
	      			<br />
			          	<div className="well" style={wellStyles}>
						    <Button color="primary" size="lg" block onClick={this.toggle1} >{this.props.buttonLabel}  Individual Car Owner </Button>
						    <Modal isOpen={this.state.modal1} toggle1={this.toggle1} className={this.props.className}>
						        <ModalHeader toggle1={this.toggle1}>
						        	<h5 style={{textAlign : 'center'}}>
								        Hi Individual Car Owner
								    </h5>
								</ModalHeader>
						        <ModalBody>
						          	<p> If you are the owner of a licensed vehicle, then you can click below button to register your vehicle under our company </p>
						        </ModalBody>
						        <ModalFooter>
						        	<Link to="/BecomePartner/Owner"><Button color="primary" onClick={this.toggle1}> Register </Button>{' '}</Link> 
							        <Button color="secondary" onClick={this.toggle1}>Cancel</Button>
						        </ModalFooter>
					        </Modal>
							<Button color="secondary" size="lg" block onClick={this.toggle} > {this.props.buttonLabel} Fleet owner </Button>
							<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					          	<ModalHeader toggle={this.toggle}>
						          	<h5 style={{textAlign : 'center'}}>
	        							Hi Fleet owner
	      							</h5>					
      							</ModalHeader>
					          	<ModalBody>
					          		<p>In a logistics company or a transportation company, fleet managers can register your vehicle under our company</p>
					          	</ModalBody>
					          	<ModalFooter>
						            <Link to="/BecomePartner/Fleet"><Button color="primary" onClick={this.toggle}> Register </Button>{' '}</Link> 
						            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
					          	</ModalFooter>
					        </Modal>
						</div>
				    </Col>
    			</Row>
	          </div>
						
	      </div>
			
	      </Col >
	      </Row >
					
		);
		
  }
}
