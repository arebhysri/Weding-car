import React from 'react';
import 'antd/dist/antd.css';
import Frontform from './Frontform';
import NavBar from './NavBar';
import Mission from './Mission';
import Cardtab from './Cardtab';

import { Row, Col } from 'antd';
import Footer from './Footer';

export default class Slider extends React.Component {
  render() {
    return (
      <Row className="containerin">
      <Col push={24}>
          <Frontform />
            <img src={require('../image/coule.jpg')}
              style={{ width: '100%', height: '700px' }}
            />
          <NavBar />
          <Mission />
          <br/>
          
      </Col>
      </Row>
    );
  }
}
