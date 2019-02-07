import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {  Icon ,Upload} from 'antd';
import {  FormGroup,Col,Row ,Input} from 'reactstrap';
import {Button } from 'react-bootstrap';
import axios from 'axios';

class Owner extends Component {
	constructor(props){
		super(props);
		this.state = {
			name : '',
			OwnerNIC : '',
			address : '' , 
			driving_li_cpy : '' ,
			driving_li_no : '' ,
			contactNo : '' , 
			NICno : '',
			OwnerName : localStorage.getItem('data'),
			driving_li_cpy:''
		}
	}

	handleChange = event => {
		this.setState({ 
			[event.target.name]: event.target.value
		});
	};
	
	handlelogin = () => {
		this.setState({
		  isLoggedIn : true
	
		})
	}

	componentDidMount() {
		let ownerID = this.state.OwnerName;
		axios.get(`http://localhost:3000/api/Ind_owners/findOne?filter={"where":{"OwnerName":"${ownerID}"}}`)
		.then(response => {
			this.setState({
				ownerNICId: response.data.NIC_Pass_no
			}, () => {
				console.log(this.state.ownerNICId);
			})
		})
		.catch(err => console.log(err));
	}

	fileUploadDrivingLicence = () => {
		const fd = new FormData();
		fd.append('image1',this.state.driving_li_cpy, this.state.driving_li_cpy.name )
		axios.post('http://localhost:3000/api/attachmentBanks/NIC/upload',fd , {
			onUploadProgress : ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
		.then(res => {
			this.setState({
				driving_li_cpy: res.data.result.files.image1[0].name,
			});
			
		});
	}

	fileSelectedDrivingLicence = event =>{
		this.setState({
			driving_li_cpy: event.target.files[0]
		})
		
	}

	AddDriverDetail(newDriver){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/Drivers',
			data : newDriver
		}).then(response => {
			console.log(response.data);
		}).catch(err => console.log(err));
	}
	
	onSubmit(e){
		//console.log(this.state.Driver_photo)
		const newDriver = {
			name : this.state.name,
			OwnerNIC : this.state.ownerNICId,
			address : this.state.address , 
			NICno : this.state.NICno ,
			driving_li_cpy : this.state.driving_li_cpy ,
			driving_li_no : this.state.driving_li_no , 
			contactNo : this.state.contactNo
		}
		console.log(newDriver)
		this.AddDriverDetail(newDriver);
		e.preventDefault();

		
	}
  	render() {
    	return (
	    <div>
	    <h4 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}>Driver Details</h4>
		<form onSubmit ={this.onSubmit.bind(this)}>
			<FormGroup>
					<Input onChange={this.handleChange} className="form-control" type="text" placeholder="Driver Name" name="name"/>
			</FormGroup>
			<FormGroup>
					<Input onChange={this.handleChange} className="form-control" type="hidden" value={this.state.ownerNICId} name="OwnerNIC" />
			</FormGroup>
			<FormGroup>
					<Input onChange={this.handleChange} className="form-control" type="text" placeholder="Driver Address" name="address"/>
			</FormGroup>
			<FormGroup>
					<Input onChange={this.handleChange} className="form-control" type="text" placeholder="Driver NIC" name="NICno"/>
			</FormGroup>
			<FormGroup>
			<Row form>
        <Col md={6}>
					<FormGroup>
					<span>Driver driving licence copy</span> <br/>
					<input style={{display :'none'}} type="file" onChange={this.fileSelectedDrivingLicence} ref={fileInput => this.fileInput = fileInput } />
					<Button onClick={()=>this.fileInput.click()} >
								<Icon type="upload" />Choose Image
					</Button> &nbsp;
					<Button onClick={this.fileUploadDrivingLicence}> upload </Button>
					</FormGroup>
				</Col>

			<Col md={6}><br/>
				<FormGroup>
				<Input onChange={this.handleChange} className="form-control" type="text" placeholder="driving licence No" name="driving_li_no"/>
				</FormGroup>
			</Col>
			</Row>
			</FormGroup>
			<FormGroup>
					<Input onChange={this.handleChange} className="form-control" type="text" placeholder="Contact number" name="contactNo"/>
			</FormGroup>
				<Input className="btn btn-primary" type="submit" value="Submit" />
		</form>
		</div>
    );
  }
}
export default Owner;