import React from 'react';
import 'antd/dist/antd.css';
import {Tabs } from 'antd';
import NavBar from './NavBar';
import { Breadcrumb, Icon ,Row, Col} from 'antd';
import  { FormControl,FormGroup } from 'react-bootstrap';
import FleetOwner from './FleetOwner';
import FleetBankDetail from './FleetBankDetail';
import FleetCarDetail from './FleetCarDetail';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

export default class Fleet extends React.Component {
	
  	render() {
    	return (
    	  <Row className="containerin">
	      <Col push={24}>
	      <div >
	          <NavBar />
	          <div>
	          	<Breadcrumb style={{textAlign : 'justify' ,padding:'30px'}}>
				    <Breadcrumb.Item href="/">
				      <Icon type="home" />
				    </Breadcrumb.Item>
				    <Breadcrumb.Item>
				      Become Partner / Fleet Owner
				    </Breadcrumb.Item>
				</Breadcrumb>
	          	<br />
	          	<h3 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}> Fleet Owner </h3>
	          </div>
	          <div>
	          	<Col span={14} offset={4} ><br/>
	          	<Tabs onChange={callback} type="card">
				    <TabPane tab="Fleet Owner Detail" key="1">
				    	<FleetOwner/>
				    </TabPane>
				    <TabPane tab="Bank Detail" key="2">
							<FleetBankDetail/>
						</TabPane>
				    <TabPane tab="Vehicle Detail" key="3">
							<FleetCarDetail/>
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
