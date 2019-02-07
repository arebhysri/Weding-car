import React, {Component} from 'react';
import axios from 'axios';
import CarItem from './CarItem';
import {Row, Col,Breadcrumb,Icon} from 'antd';
import {Badge} from 'reactstrap';
import NavBar from './NavBar';

class Exotic extends Component{
	constructor(){
		super();
		this.state = {
			car : []
		}
	}
	componentWillMount(){
		this.getCars();   
	}

	getCars(){
		axios.get('http://localhost:3000/api/cars?filter={"where":{"carType":"exoticCars"}}')
		.then(response => {
			this.setState({car: response.data}, () => {
				
			})
		})
		.catch( err => console.log(err));
	}
	render(){
		console.log(this.state.car);
		const carItems = this.state.car.map((car, i) => {
			
			return(
				<CarItem key={car.id} item={car} />
			)
		})
		return(
			<div style={{background:'#f3f3f3'}}>
				<Row className="containerin">
	      			<Col push={24}>
					<img src={require('../image/couplewed.jpg')}
					style={{ width: '100%', height: '700px' }}
					/>
					<NavBar /><br/>
					
					<Row style={{background:'#ffff'}} center="xs">
						<Col xs={6} style={{textAlign : 'justify' ,padding:'30px'}}>
							<Breadcrumb>
								<Breadcrumb.Item href="/">
								<Icon type="home" />
								</Breadcrumb.Item>
								<Breadcrumb.Item href="/car">
								<span>Car</span>
								</Breadcrumb.Item>
								<Breadcrumb.Item>
								Exotic Cars
								</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
					</Row><br/>
					<h2 style={{textAlign:"center" }}><Badge color="info" outline>You can see our cars</Badge></h2><br/>
					<Row align="middle" align="middle" type="flex" justify="space-around">
						{carItems}
					</Row>
					</Col >
	  			</Row>	
			</div>
		)
	}
}

export default Exotic;
