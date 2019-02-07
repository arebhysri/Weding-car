import React from 'react';
import {Row,Col,Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;

export default class Admin extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', values);
		  }
		});
  }
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  constructor(props){
		super(props);
		this.state = {
			email : '',
      password : '',
      details : '',
      isLoggedIn : false
		}
	}

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit(e){    
		var email = this.state.email;
		var password = this.state.password;
        axios.get(`http://localhost:3000/api/UserLogins/findOne?filter={"where":{"email":"${email}"}}`)
		.then(response => {
			this.setState({details: response.data}, () => {
				if(password === this.state.details.password && this.state.details.userType === "admin"){
          sessionStorage.setItem('data', this.state.details.username);
          sessionStorage.setItem('email', this.state.details.email);
          console.log("login");
          window.location.href = 'http://localhost:3001/Admin/AdminHome';
          //this.props.handlelogin();
        }else{
            console.log("not login");
        }
			})
		})
		.catch( err => console.log(err));
        e.preventDefault();
  }

render() {		
    return (
      <div style={{padding :"400px"}}>
        <Row>
          <Col span={12} offset={6}>
          <Button type="primary" onClick={this.showModal}>
            Open Modal
          </Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div>
                <form onSubmit ={this.onSubmit.bind(this)} >
                <FormItem>
                    <Input onChange={this.handleChange} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} name="email" type="email" placeholder="abcd@gmail.com" />
                </FormItem>
                <FormItem>
                    <Input onChange={this.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name="password" type="password" placeholder="Password" />
                </FormItem>
                <FormItem>
                    <Checkbox>Remember me</Checkbox>
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                </FormItem>
                </form>
            </div>
          </Modal>
          </Col>
        </Row>
        
      </div>

        
    
      
    );
  }
}
