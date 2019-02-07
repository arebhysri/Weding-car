import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Col} from 'antd';
import {Button} from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const { Meta } = Card;
class CarItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			item:props.item,
			size : 1,
			photoIndex: 0,
      		isOpen: false,
			
		}
	}
	render(){		
		const { photoIndex, isOpen } = this.state;
		let images = this.state.item.car_photo.split(",");

		return(
			<div>
			{this.state.item.car_photo.split(",").slice(0, this.state.size).map((image, index) =>
				<Col xs={6}>
					<Card hoverable style={{width: 400,padding:20 ,height:500 }}
					cover={<img top style={{ width: '350px', height: '250px' }} src={require('../images/Car_Image/'+image)} 
                            key={index} />}>
					<Meta style={{textAlign:'center'}}
						title={"Model :" + " "+ this.state.item.model}
					/><br/>
					<div style={{textAlign:'center'}}>
						<p>Brand : {this.state.item.brand} </p>
						<p>Color : {this.state.item.color} </p>
						<Button type="button" onClick={() => this.setState({ isOpen: true })} outline color="info">Check More Images Of This Car</Button><br/>
						{isOpen && (
							<Lightbox
								mainSrc={require('../images/Car_Image/'+images[photoIndex])}
								nextSrc={require('../images/Car_Image/'+images[(photoIndex + 1) % images.length])}
								prevSrc={require('../images/Car_Image/'+images[(photoIndex + images.length - 1) % images.length])}
								onCloseRequest={() => this.setState({ isOpen: false })}
								onMovePrevRequest={() =>
								this.setState({
									photoIndex: (photoIndex + images.length - 1) % images.length,
								})
								}
								onMoveNextRequest={() =>
								this.setState({
									photoIndex: (photoIndex + 1) % images.length,
								})
								}
							/>
						)}
						
						<Link to={`/car/${this.state.item.id}`}>{
							<Button outline color="info">Book Now</Button>
						}
						</Link>
					</div>
					</Card><br/>
				</Col>
				)		
			}
			</div>	 	
		)
	}
}

export default CarItem;