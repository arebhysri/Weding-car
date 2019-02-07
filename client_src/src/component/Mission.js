import React from 'react';
import { Card,Col, Row } from 'antd';
import { Jumbotron, Button } from 'reactstrap';

const gridStyle = {
  width: '53%',
  textAlign: 'center',
  background: '#fff',
}
const gridStyle1 = {
  width: '40%',
  textAlign: 'center',
  background: '#fff',
}


export default class Frontform extends React.Component {
	state = {
		size: 'large',
	};
	handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  
  render() {
    return (
    	<div style={{ background: '#ECECEC', padding: '80px' }}>
    		<Row type="flex" justify="start">
		      <Col span={21} style={{ background: '#fff'}}>
		      	<Col span={11} push={13} style={{ background: '#efa80f'}}>
		      		<div style={gridStyle1} style={{background: '#fff',width:'100%', padding:'30px'}}>
						<div style={{ background: '#efa80f', paddingTop: '130px'}}>
							<div>
			    			<img
					        src={require('../image/block-transparent-img.png')}
					        style={{width:'600px', height: '300px'}}
					    	/>
					    	</div>
					    </div>
			    	</div>
		      	</Col>
      			<Col span={13} pull={11}>
							<div>
								<Jumbotron style={{background: '#fff'}}>
									<h1 className="display-3" >Hi! Customers</h1>
									<p className="lead">Our site will help you to make your wedding as special</p>
									<hr className="my-2" />
									<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
									
								</Jumbotron>
							</div>
      			</Col>
		      </Col>
		    </Row>
    	</div>
    );
  }
}


