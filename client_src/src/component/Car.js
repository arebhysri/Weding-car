import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import {Row, Col} from 'antd';
import {Card,Badge, CardBody, CardImg, CardText,CardTitle, CardSubtitle, Button} from 'reactstrap';

class Car extends Component{
	render(){		
		return(
			<Row className="containerin">
	      <Col push={24} style={{background:'#f3f3f3'}}>
            <img src={require('../image/couplewed.jpg')}
              style={{ width: '100%', height: '700px' }}
            />
	        <NavBar /><br/>
			<h2 style={{textAlign:"center" }}><Badge color="info" outline>You can see our cars</Badge></h2><br/>
			<Row  align="middle" align="middle" type="flex" justify="space-around">
				<Col xs={6}>
					<Card>
						<CardImg top width="100%" src={require("../image/luxury.jpg")} alt="Card image cap" />
						<CardBody>
						<CardTitle>Luxury Car</CardTitle>
						<Link to={`/car/luxury`}><Button color="primary" outline >Click Here To See Our Cars</Button></Link>
						</CardBody>
					</Card>
				</Col>
				<Col xs={6}>
					<Card>
						<CardImg top width="100%" src={require("../image/delux.jpg")} alt="Card image cap" />
						<CardBody>
						<CardTitle>Deluxe Car</CardTitle>
						<Link to={`/car/Delux`}><Button color="primary" outline >Click Here To See Our Cars</Button></Link>
						</CardBody>
					</Card>
				</Col>
				<Col xs={6}>
					<Card>
						<CardImg top width="100%" src={require("../image/sluxury.jpg")} alt="Card image cap" />
						<CardBody>
						<CardTitle>Super Luxury Car</CardTitle>
						<Link to={`/car/SuperLuxury`}><Button color="primary" outline >Click Here To See Our Cars</Button></Link>
						</CardBody>
					</Card>
				</Col>
			</Row><br/>
				<Row align="middle" align="middle" type="flex" justify="space-around">
					<Col xs={6}>
						<Card>
							<CardImg top width="100%" src={require("../image/classic.jpg")} alt="Card image cap" />
							<CardBody>
							<CardTitle>Classic Car</CardTitle>
	
							<Link to={`/car/classic`}><Button color="primary" outline >Click Here To See Our Cars</Button></Link>
							</CardBody>
						</Card>
					</Col>
					<Col xs={6}>
						<Card>
							<CardImg top width="100%" src={require("../image/limousine.png")} alt="Card image cap" />
							<CardBody>
							<CardTitle>Limousine Car</CardTitle>
	
							<Link to={`/car/limousine`}><Button color="primary" outline >Click Here To See Our Cars</Button></Link>
							</CardBody>
						</Card>
					</Col>
					<Col xs={6}>
						<Card>
							<CardImg top width="100%" src={require("../image/exotic.jpg")} alt="Card image cap" />
							<CardBody>
							<CardTitle>Exotic Car</CardTitle>
	
							<Link to={`/car/Exotic`}><Button color="primary" outline >Click Here To See Our Cars</Button></Link>
							</CardBody>
						</Card>
					</Col>
					
				</Row>
	      	</Col >
	  	</Row>
		)
	}
}

export default Car;