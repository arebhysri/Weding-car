import React from 'react';
import { Form, Input, Select,Layout, Menu, Breadcrumb, Icon} from 'antd';
import axios from 'axios';
import Img from 'react-image';
import {NavLink,Table,Button} from 'reactstrap';

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout  
  const FormItem = Form.Item;
  const Option = Select.Option;
class Register extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			username : '',
			email : '',
			password : '' , 
      cpassword : '',
      userType :[]
		}
	}

    handleChange1=(value)=> {
		//var carType =`${value}`;
		this.setState({
			userType: value
		})
		//console.log(value)
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
        let itemUser = this.state.userDetail
        return (
            <div>
                <Layout>
                    <Header className="header">
                    <div className="logo" />
                    <Menu 
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">{sessionStorage.getItem('data')}</Menu.Item>
                        <Menu.Item key="2">
                        <Button type="default" onClick={this.handleLogout}>
                            <Icon type="login" />
                        </Button>
                        </Menu.Item>
                        
                    </Menu>
                    </Header>
                    <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                       <SubMenu key="sub1" title={<span><Icon type="user" />Manage User</span>}>
                            <Menu.Item key="1">
                            <NavLink href="/Admin/AdminHome/ManageUser">View All User</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                            <NavLink href="/Admin/AdminHome/AddUser">Add User</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />Manage Car</span>}>
                            <Menu.Item key="5">
                            <NavLink href="/Admin/AdminHome/ManageCar">View All User</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />Manage Own Car Owner</span>}>
                            <Menu.Item key="9">
                            <NavLink href="/Admin/AdminHome/ManageOwnCarUser">View All Own Car Owner User</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="notification" />Manage Fleet Car Owner</span>}>
                            <Menu.Item key="13">
                            <NavLink href="/Admin/AdminHome/ManageFleetUser">View All Fleet car User</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home / Manage User  </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{justifyContent: 'center', alignItems: 'center' ,
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        <h3>User Add</h3>
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
                        <FormItem>
                        <Select
                            showSearch
                            style={{ width: 340 }}
                            placeholder="Select Your User Type"
                            optionFilterProp="children"
                            onChange={this.handleChange1}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>
                            
                        <FormItem>
                            <Input onChange={this.handleChange} type="hidden" placeholder="userType" value="user" name="userType" />
                        </FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" name="submit" type="submit">
                            Sign Up
                            </Button>
                        </FormItem>
                        </form>
                        </div>
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            
            </div>
        );
    }
}
export default Register;