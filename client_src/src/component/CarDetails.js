import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import {Row, Col ,Steps, message} from 'antd';
import {Badge,Button} from 'reactstrap';
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'


class CarDetails extends Component{
	constructor(props) {
		super(props);
		this.state = {
		  current: 0,
		};
	}

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
	}
	
	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}

	
	render(){		
		const { current } = this.state;
		const Step = Steps.Step;

	const steps = [{
	title: 'First',
	content: <StepOne/>,
	}, {
	title: 'Second',
	content: <StepTwo/>,
	}, {
	title: 'Third',
	content: <StepThree/>,
	},
	{
	title: 'Last',
	content: <StepFour/>,
	}
	];
	

		return(
			<Row className="containerin">
	      	<Col push={24} style={{background:'#f3f3f3'}}>
            <img src={require('../image/car1a.jpg')}
              style={{ width: '100%', height: '700px' }}
            />
	        <NavBar /><br/>
			<h2 style={{textAlign:"center" }}><Badge color="info" outline>Book your cars</Badge></h2><br/>
			<Col xs={12}>
				<Row center="xs">
					<Col span={12} offset={6}>
					<div>
							<Steps current={current}>
							{steps.map(item => <Step key={item.title} title={item.title} />)}
							</Steps>
							<div className="steps-content">{steps[this.state.current].content}</div>
							<div className="steps-action">
							{
								this.state.current < steps.length - 1
								&&
								<Button type="primary" onClick={() => this.next()}>Next</Button>
							}
							{
								this.state.current === steps.length - 1
								&&
								<Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
							}
							{
								this.state.current > 0
								&&
								<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
								Previous
								</Button>
							}
							</div>
						</div>
					</Col>
				</Row>
			</Col>

	      	</Col >
	  	</Row>
		)
	}
}

export default CarDetails;