import React from 'react';
import { Form, Modal, Table,Layout, Menu, Breadcrumb, Icon} from 'antd';
import axios from 'axios';
import {NavLink,Button} from 'reactstrap';
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout
  const confirm = Modal.confirm;

class ManageOwnCarUser extends React.Component {
    constructor(){
        super();
        this.state = {
            carDetail : [],
        }
    }
    componentWillMount(){
		this.Car();
	}

    
	Car(){
		axios.get('http://localhost:3000/api/Ind_owners')
		.then(response => {
			this.setState({carDetail: response.data}, () =>{
            })
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

    onDelete=(id)=>{
        //let UserId=item;
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'Some descriptions',
            onOk() {
            console.log('OK');
            let UserId=id;
            console.log(id)
            axios.delete(`http://localhost:3000/api/Ind_owners/${UserId}`)
                .then(response=>{
                    this.props.history.push('/Admin/AdminHome/');
            }).catch(err => console.log(err));
            },
            onCancel() {
            console.log('Cancel');
            },
        });

    }

    render() {
        let itemCar = this.state.carDetail,
        columns = [
            {
                title: '#', width: 100, dataIndex: 'id', key: 'id', fixed: 'left',
            },
            {
                title: 'Owner Name', width: 100, dataIndex: 'OwnerName', key: 'OwnerName', fixed: 'left',
              },
            {
              title: 'Owner Address', width: 100, dataIndex: 'OwnerAddress', key: 'OwnerAddress', fixed: 'left',
            },
            {
              title: ' Owner NIC /Passport copy ', dataIndex: 'NICcopy', key: 'NICcopy', width: 100,
              render: (record1) =><img style={{ width: '100px', height: '80px' }}
               src={require('../images/NIC/'+record1)}
               height={ 80 }
               width={200}
               />
            },
            {
              title: ' Owner NIC /Passport number ', dataIndex: 'NIC_Pass_no', key: 'NIC_Pass_no', width: 100,
            },
            {
              title: ' Vehicle book copy ',
               dataIndex: 'Vehicle_cpy', key: 'Vehicle_cpy', 
               width: 100,
               render: (record2) =><img style={{ width: '100px', height: '80px' }}
               src={require('../images/VehiclebookCopy/'+record2)}
               height={ 80 }
               width={200}
               />
            },
            {
              title: ' Driver driving licence number ',
               dataIndex: 'DrivingLiNo', 
               key: 'DrivingLiNo', 
               width: 150,
               
            },
            {
              title: ' Driver driving licence copy ', dataIndex: 'Drive_Li_cpy', key: 'Drive_Li_cpy', width: 150,
              render: (record3) =><img style={{ width: '100px', height: '80px' }}
               src={require('../images/DrivingLicenceCopy/'+record3)}
               height={ 80 }
               width={200}
               />
            },
            {
                title: ' Owner Mobile Number ', dataIndex: 'Mobile_No', key: 'Mobile_No', width: 150,
                
            },
            {
                title: ' Owner Land Phone Number ', dataIndex: 'LandPh_No', key: 'LandPh_No', width: 150,
                
            },
            {
                title: ' Owner Email Address ', dataIndex: 'emailAdd', key: 'emailAdd', width: 150,
                
            },
            {
                title: ' Delete ',
                key: 'operation',
                width: 100,
                render: (record) =><Button onClick={()=>this.onDelete(record.id)}  outline color="danger"> Delete </Button>
            }
        ];
        

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
                            <NavLink href="/Admin/AdminHome/ManageCar">View All car</NavLink>
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
                        <Breadcrumb.Item>Home / Manage User  </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{justifyContent: 'center', alignItems: 'center' ,
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        <h3>Driver Details </h3>
                        <Table columns={columns} dataSource={this.state.carDetail} scroll={{ x: 1500, y: 500 }} />
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            
            </div>
        );
    }
}
export default ManageOwnCarUser;