import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Tabs} from 'antd';
import NavBar from './NavBar';
import OwnerDetail from './OwnerDetail';
import CarDetail from './CarDetail';
import BankDetails from './BankDetails';
import DriverDetail from './DriverDetail';
import { Breadcrumb, Icon ,Row, Col} from 'antd';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class Owner extends Component {
	onSubmit(e){
		console.log(this.refs.Owname.value);
		e.preventDefault();
	}
	
  	render() {
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
				      Become Partner / Individual Car Owner
				    </Breadcrumb.Item>
				</Breadcrumb>
	          	<br />
	          	<h3 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}> Individual Car Owner </h3>
	          </div>

	          <div>
	          	<Col span={14} offset={4}><br/>
	          	<Tabs onChange={callback} type="card">
								<TabPane tab="Owner Details" key="1">
								<OwnerDetail />				   	
								</TabPane>

								<TabPane tab="Car Details" key="2">
								<CarDetail />
								</TabPane>

								<TabPane tab="Bank Details" key="3">
								<BankDetails />
								</TabPane>

								<TabPane tab="Driver Details" key="4">
								<DriverDetail />
								</TabPane>
							</Tabs>
							</Col>
						
	          </div>
						
	      </div>
	      </Col >
				
	      </Row >
					
				
    );
  }
}
export default Owner;