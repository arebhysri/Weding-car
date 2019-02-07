import React  from 'react';
import { Tabs } from 'antd';
import { Row, Col } from 'antd';
import { Media } from 'reactstrap';

const { TabPane } = Tabs;


export default class Cardtab extends React.Component {
  state = { size: 'large' };

  onChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { size } = this.state;
    return (
      <div>
      	<Row>
	      <Col span={8}>
	      	<Tabs defaultActiveKey="1" size={size}>
	          <TabPane tab="Top Popular" key="1">
	          	<Media>
			      <Media left href="#">
			        <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
			      </Media>
			      <Media body>
			        <Media heading>
			          Media heading
			        </Media>
			        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
			      </Media>
			    </Media>
	          </TabPane>
	          <TabPane tab="NEW CARS" key="2">
	          	<Media>
			      <Media left href="#">
			        <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
			      </Media>
			      <Media body>
			        <Media heading>
			          Media heading
			        </Media>
			        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
			      </Media>
			    </Media>
	          </TabPane>
	          <TabPane tab="Sale Off" key="3">
	          	<Media>
			      <Media left href="#">
			        <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
			      </Media>
			      <Media body>
			        <Media heading>
			          Media heading
			        </Media>
			        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
			      </Media>
			    </Media>
	          </TabPane>
	        </Tabs>
	      </Col>
	      <Col span={6}>col-12</Col>
	    </Row>
        
      </div>
    );
  }
}



