import React from 'react';
import { Form, Modal, Table,Layout, Menu, Breadcrumb, Icon} from 'antd';
import axios from 'axios';
import Img from 'react-image';
import {NavLink,Button} from 'reactstrap';

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout
  const confirm = Modal.confirm;

class ManageUser extends React.Component {
    constructor(){
        super();
        this.state = {
            userDetail : []
        }
    }
    componentWillMount(){
		this.getUsers();
	}

	getUsers(){
		axios.get('http://localhost:3000/api/UserLogins')
		.then(response => {
			this.setState({userDetail: response.data}, () =>{
				//console.log(this.state);
            })
            //console.log(this.state.userDetail);
		})
		.catch( err => console.log(err));
    }
    
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

    onDelete(id){
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'Some descriptions',
            onOk() {
            console.log('OK');
            let UserId=id;
            console.log(id)
            axios.delete(`http://localhost:3000/api/UserLogins/${UserId}`)
                .then(response=>{
                    this.props.history.push('/Admin/AdminHome/');
            }).catch(err => console.log(err));
            },
            onCancel() {
            console.log('Cancel');
            },
        });
        
    }

    showConfirmEdit(id) {
    confirm({
        title: 'Do you Want to edit these items?',
        content: 'Some descriptions',
        onOk() {
        console.log('OK');
        console.log(id);
        sessionStorage.setItem('id', id);
        window.location.href = 'http://localhost:3001/Admin/AdminHome/EditUser';
        },
        onCancel() {
        console.log('Cancel');
        },
    });
    }
    render() {
        
        let itemUser = this.state.userDetail,
        columns = [
            {
                title: '#', width: 100, dataIndex: 'id', key: 'id',
            },
            {
                title: 'User Name', width: 100, dataIndex: 'username', key: 'username',
              },
            {
              title: 'Email Address', width: 100, dataIndex: 'email', key: 'email',
            },
            {
              title: ' Password ', width: 150 ,dataIndex: 'password', key: 'password',
            },
            {
              title: ' User type ', width: 150,dataIndex: 'userType', key: 'userType', 
            },
            {
                title: ' Edit ',
                key: 'operation',
                width: 100,
                render: (record) => <Button onClick={()=>this.showConfirmEdit(record.id)} outline color="success">Edit</Button>,
            },
            {
                title: ' Delete ',
                key: 'operation',
                width: 100,
                render: (record) =><Button onClick={()=>this.onDelete(record.id)}  outline color="danger"> Delete </Button>
            }
        ];
        let data = [];
        {itemUser.map(item =>
            data.push({
            id: `${item.id}`,
            username: `${item.username}`,
            email: `${item.email}`,
            password: `${item.password}`,
            userType: `${item.userType}`
            })
        )}
        
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
                            <NavLink href="/Admin/AdminHome/ManageFleetUser">View All Fleet car User</NavLink>
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
                        <Breadcrumb.Item>Home / Manage User  </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{justifyContent: 'center', alignItems: 'center' ,
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        <h3>User Details</h3>
                        <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            
            </div>
        );
    }
}
export default ManageUser;