import React, { Component } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Select,Icon} from 'antd';
import {  FormGroup,Col,Row, Input, FormFeedback } from 'reactstrap';
import {Button,InputGroup } from 'react-bootstrap';
const Option = Select.Option;

class FleetOwner extends Component {
	constructor(props){
		super(props);
		this.state = {
			OwnerName : localStorage.getItem('data'),
            emailAdd : localStorage.getItem('email'),
            companyName: '',
            contactNo: '',
            landPhoneNo: '',
            emailAddress: '',
            bussinessRegiNo: '',
            bussinessRegiCpy: null,
			validEmail:false,
			validMonum:false,
			validLanum:false,
			isLoggedIn : false,
			city:''
		}
	}

	handlelogin = () => {
		this.setState({
		  isLoggedIn : true
	
		})
	}

	handleChange2=(value)=> {
		this.setState({
			city: value
    })
    
  }
	BussinessFileSelecter = event =>{
		this.setState({
			BussinessbookCopy : event.target.files[0]
		})
	}

	BussinessFileUploadHandler = () => {
		const fd1 = new FormData();
		fd1.append('img2', this.state.BussinessbookCopy, this.state.BussinessbookCopy.name);
		axios.post('http://localhost:3000/api/attachmentBanks/BissRegiCopy/upload',fd1 , {
			onUploadProgress: ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
			.then(res => {
				this.setState({
					bussinessRegiCpy: res.data.result.files.img2[0].name,
				});
			});
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });

		var emailAdd = this.state.emailAdd;
		var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/
		if (pattern.test(emailAdd)) {
			console.log("true : " + emailAdd );
			this.setState({validEmail:false});	
		}else{
			console.log('Bad email address: ' + emailAdd);
			this.setState({validEmail:true});
			return false;
		}
			
	};
	
	AddFleetOwnerDetail(newOwner){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/fleetOwners',
			data : newOwner
		}).then(response => {
			console.log(response.data);
		}).catch(err => console.log(err));
	}
	onSubmit(e){
		
		const newOwner = {
            companyName: this.state.companyName,
            OwnerName: this.state.OwnerName,
            city: this.state.city,
            contactNo: this.state.contactNo,
            landPhoneNo: this.state.landPhoneNo,
            emailAddress: this.state.emailAdd,
            bussinessRegiNo: this.state.bussinessRegiNo,
            bussinessRegiCpy: this.state.bussinessRegiCpy
		}
		this.AddFleetOwnerDetail(newOwner);
		e.preventDefault();
	}
  	render() {
    	return (
	    <div>

	    <h4 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}>Owner Details </h4>
		<form onSubmit ={this.onSubmit.bind(this)}>
            <FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} value={this.state.OwnerName} className="form-control" type="text" placeholder="Owner Name / Immediate contact person" name="OwnerName"/>
			</FormGroup>
            <FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} value={this.state.companyName} className="form-control" type="text" placeholder="Company Name" name="companyName"/>
			</FormGroup>
			<FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} className="form-control" type="text" placeholder="Land Phone number" name="landPhoneNo" />
			</FormGroup>

			<FormGroup>
			<Row form>
        		<Col md={6}>
					<FormGroup>
					<span>Copy of bussiness registration</span> <br/>
					<input style={{display :'none'}} type="file" onChange={this.BussinessFileSelecter} ref={fileInput => this.fileInput = fileInput } />
					<Button onClick={()=>this.fileInput.click()} >
								<Icon type="upload" />Choose Image
					</Button> &nbsp;
					<Button onClick={this.BussinessFileUploadHandler}> upload </Button>
					</FormGroup>
				</Col>

			<Col md={6}>
				<FormGroup><br/>
                <Input onChange={this.handleChange} className="form-control" type="text" placeholder="bussiness registration No" name="bussinessRegiNo" />
				</FormGroup>
			</Col>
			</Row>
			</FormGroup>

			<FormGroup bssize="sm">
			  <InputGroup>
			    <Input onChange={this.handleChange} className="form-control" valid={!this.state.validMonum} type="text" placeholder="Contact number" name="contactNo" />
			  </InputGroup>
			</FormGroup>
			<FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} value={this.state.emailAdd} className="form-control" valid={!this.state.validEmail} type="email" placeholder="Email Address" name="emailAdd" />
				  <FormFeedback valid={!this.state.validEmail}>Sweet! that email is valid</FormFeedback>
			</FormGroup>
			<FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} className="form-control" type="text" placeholder="Residential Address" name="OwnerAddress" />
			</FormGroup>

			<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Select size={"large"}
                showSearch
                style={{ width: 750 }}
                placeholder="Pick your District"
                optionFilterProp="children"
                onChange={this.handleChange2}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="Ampara">Ampara</Option>
                <Option value="Anuradhapura">Anuradhapura</Option>
                <Option value="Badulla">Badulla</Option>
                <Option value="Baticaloa">Baticaloa</Option>
                <Option value="Colombo">Colombo</Option>
                <Option value="Galle">Galle</Option>
                <Option value="Gampaha">Gampaha</Option>
                <Option value="Hambantota">Hambantota</Option>
                <Option value="Jaffna">Jaffna</Option>
                <Option value="Kalutara">Kalutara</Option>
                <Option value="Kandy">Kandy</Option>
                <Option value="Kegalle">Kegalle</Option>
                <Option value="Kilinochchi">Kilinochchi</Option>
                <Option value="Kurunegala">Kurunegala</Option>
                <Option value="Mannar">Mannar</Option>
                <Option value="Matale">Matale</Option>
                <Option value="Matara">Matara</Option>
                <Option value="Moneragala">Moneragala</Option>
                <Option value="Mullaitivu">Mullaitivu</Option>
                <Option value="Nuwara Eliya">Nuwara Eliya</Option>
                <Option value="Polonnaruwa">Polonnaruwa</Option>
                <Option value="Puttalam">Puttalam</Option>
                <Option value="Ratnapura">Ratnapura</Option>
                <Option value="Trincomalee">Trincomalee</Option>
                <Option value="Vavuniya">Vavuniya</Option>
              </Select>
          </FormGroup><br/>
			<Input className="btn btn-primary" type="submit" value="Submit" />
		</form>
		</div>
    );
  }
}
export default FleetOwner;