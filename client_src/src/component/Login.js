import React from 'react';
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;

export default class Login extends React.Component {
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
				if(password === this.state.details.password){
                    localStorage.setItem('data', this.state.details.username);
                    localStorage.setItem('email', this.state.details.email);
                    console.log("login")
                    this.props.handlelogin();
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
        );
    }
}