import React from 'react';
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class Register extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			username : '',
			email : '',
			password : '' , 
      cpassword : '',
      userType :'user'
		}
	}

  handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
  };
  
  AddUser(newUser){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/UserLogins',
			data : newUser
		}).then(response => {
			console.log(response.data);
		}).catch(err => console.log(err));
	}
	onSubmit(e){
    
	
		e.preventDefault();

    const Password=this.state.password;
		const Passwordnew=this.state.cpassword;
		if(Password === Passwordnew ){
      console.log("password mach");
      const newUser = {
        username: this.state.username,
        email : this.state.email,
        password : Password,
        userType : this.state.userType
      }
      this.AddUser(newUser);
		}else{
			console.log("re type password");
			return false;
		}
		
	}
    render() {
        return (
            <div>
            <form onSubmit ={this.onSubmit.bind(this)}>
              <FormItem>
                  <Input onChange={this.handleChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="username" />
              </FormItem>
              <FormItem>
                <Input onChange={this.handleChange} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="abcd@gmail.com" name="email" />
              </FormItem>
              <FormItem>
                <Input onChange={this.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" name="password" />
              </FormItem>
              <FormItem>
                  <Input onChange={this.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="re-enter Password" name="cpassword" />
              </FormItem>
                <span>By registering, you agree to the privacy policy and terms of service.</span>
              <FormItem>
                  <Checkbox>Remember me</Checkbox>
                <br /> 
              <FormItem>
                  <Input onChange={this.handleChange} type="hidden" placeholder="userType" value="user" name="userType" />
              </FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" name="submit" type="submit">
                  Sign Up
                </Button>
              </FormItem>
            </form>
            </div>
        );
    }
}
export default Register;