import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button,Layout, Menu, Breadcrumb, Icon} from 'antd';
import axios from 'axios';
import Img from 'react-image';
import {NavLink} from 'reactstrap';

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout

class Register extends React.Component {

    handlelogin = () => {
        this.setState({
          isLoggedIn : true
    
        })
    }
    handleLogout =() => {
        this.setState({
          isLoggedIn: false,
        });
        sessionStorage.clear();
        window.location.href = 'http://localhost:3001/Admin';
    }
    render() {
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
                            <NavLink href="/Admin/AdminHome/ManageCar">View All Cars</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />Manage Driver</span>}>
                            <Menu.Item key="9">
                            <NavLink href="/Admin/AdminHome/ManageDriver">View All Driver</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="notification" />Manage Own Car User</span>}>
                            <Menu.Item key="13">
                            <NavLink href="/Admin/AdminHome/ManageOwnCarUser">View Own Car User</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="notification" />Manage Fleet Car Owner</span>}>
                            <Menu.Item key="13">
                            <NavLink href="/Admin/AdminHome/ManageFleetOwnCarUser">View All Fleet car User</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="notification" />Manage Booking Car</span>}>
                            <Menu.Item key="13">
                            <NavLink href="/Admin/AdminHome/BookingCar">View All Booking</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home / </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{justifyContent: 'center', alignItems: 'center' ,
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        <Img style={{justifyContent: 'center'}}
					        src={require('../image/naleesara.jpg')}
					        height={ 300 }
					    />
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            
            </div>
        );
    }
}
export default Register;