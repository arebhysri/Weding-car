import React from 'react';
import { Icon,Row, Col} from 'antd';
import { Card, Form, FormGroup, Input,Button, CardTitle, CardText } from 'reactstrap';
class Footer extends React.Component {
    
    render() {
        
        return (
            <div>
                
                <Row style={{ background: 'rgb(255, 191, 10)'}}>
                    <Col xs={{ span:3, offset: 1 }} lg={{ span: 3, offset: 2 }}>
                    <Card body color="warning">
                        <CardTitle>Information</CardTitle>
                        <CardText>With supporting 24/7 </CardText>
                    </Card>
                    </Col>
                    <Col xs={{ span: 12, offset: 1 }} lg={{ span: 7, offset: 2 }}>
                    <Card body color="warning">
                        
                        <CardText>
                            
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
                            </FormGroup>
                            <Button  outline color="info" ><Icon type="loading" /></Button>
                        </Form>
                        </CardText>
                    </Card>
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card body color="warning">
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Card  body color="info">
                        <CardText style={{ textAlign:'center'}}>© 2019 myweddingcar.lk. All Rights Reserved | Design by Nalees'era</CardText>
                    </Card>
                    
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Footer;