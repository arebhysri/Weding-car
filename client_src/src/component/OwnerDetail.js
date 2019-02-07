import React, { Component } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Select, Icon} from 'antd';
import {  FormGroup, Input, FormFeedback } from 'reactstrap';
import {Button,InputGroup } from 'react-bootstrap';
  
const Option = Select.Option;

class OwnerDetail extends Component {
	constructor(props){
		super(props);
		this.state = {
			OwnerName : localStorage.getItem('data'),
			emailAdd : localStorage.getItem('email'),
			NIC_Pass_no : '',
			Mobile_No : '' , 
			OwnerAddress : '' ,
			city : '' ,
			DrivingLiNo : '' , 
			LandPh_No : '',
			NICcpy : '',
			DrivingLicCpy : '',
			Vehicle_cpy : '',
			Drive_Li_cpy : '',
			NICcopy : '',
			VehicleCpy : '',
			selectedFile : null,
			DrivingLicenceCopy : null,
			VehiclebookCopy : null,
			validEmail:false,
			validMonum:false,
			validLanum:false,
			isLoggedIn : false,
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
	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append('image1',this.state.selectedFile, this.state.selectedFile.name )
		axios.post('http://localhost:3000/api/attachmentBanks/NIC/upload',fd , {
			onUploadProgress : ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
		.then(res => {
			this.setState({
				NICcpy: res.data.result.files.image1[0].name,
			});			
		});
	}

	fileSelectedHandler = event =>{
		this.setState({
			selectedFile: event.target.files[0]
		})
		
	}

	DrivingFileSelecter = event =>{
		this.setState({
			DrivingLicenceCopy : event.target.files[0]
		})
	}

	drivingFileUploadHandler = () => {
		const fd1 = new FormData();
		fd1.append('img1', this.state.DrivingLicenceCopy, this.state.DrivingLicenceCopy.name);
		axios.post('http://localhost:3000/api/attachmentBanks/DrivingLicenceCopy/upload',fd1 , {
			onUploadProgress: ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
			.then(res => {
				this.setState({
					DrivingLicCpy: res.data.result.files.img1[0].name,
				});
			});
	}

	VehicleFileSelecter = event =>{
		this.setState({
			VehiclebookCopy : event.target.files[0]
		})
	}

	VehicleFileUploadHandler = () => {
		const fd1 = new FormData();
		fd1.append('img2', this.state.VehiclebookCopy, this.state.VehiclebookCopy.name);
		axios.post('http://localhost:3000/api/attachmentBanks/VehiclebookCopy/upload',fd1 , {
			onUploadProgress: ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
			.then(res => {
				this.setState({
					VehicleCpy: res.data.result.files.img2[0].name,
				});
			});
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });

		var Mobile_No =this.state.Mobile_No;
		var totalnums = Mobile_No.length;
		if (totalnums >= 8 && totalnums <= 9){
			console.log("true : " + Mobile_No );
			this.setState({validMonum:false});
		}
		else {
			console.log('Bad phone number: ' + Mobile_No);
			this.setState({validMonum:true});
			return false;
		}
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
		var LandPh_No =this.state.LandPh_No;
		var totalnumsL = LandPh_No.length;
		if (totalnumsL >= 8 && totalnumsL <= 9){
			console.log("true : " + LandPh_No );
			this.setState({validLanum:false});
		}
		else {
			console.log('Bad home number: ' + LandPh_No);
			this.setState({validLanum:true});
			return false;
		}
			
	};
	
	AddBankDetail(newOwner){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/Ind_owners',
			data : newOwner
		}).then(response => {
			console.log(response.data);
		}).catch(err => console.log(err));
	}
	onSubmit(e){
		
		const newOwner = {
			OwnerName : this.state.OwnerName,
			NIC_Pass_no : this.state.NIC_Pass_no,
			Mobile_No : this.state.Mobile_No , 
			emailAdd : this.state.emailAdd ,
			city : this.state.city ,
			OwnerAddress : this.state.OwnerAddress ,
			DrivingLiNo : this.state.DrivingLiNo , 
			LandPh_No : this.state.LandPh_No,
			NICcopy : this.state.NICcpy,
			Drive_Li_cpy : this.state.DrivingLicCpy,
			Vehicle_cpy : this.state.VehicleCpy
		}
		this.AddBankDetail(newOwner);
		e.preventDefault();
	}
  	render() {
    	return (
	    <div>

	    <h4 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}>Owner Details </h4>
		<form onSubmit ={this.onSubmit.bind(this)}>
			<FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} value={this.state.OwnerName} className="form-control" type="text" placeholder="Owner Name" name="OwnerName"/>
			</FormGroup>
			<FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} className="form-control" type="text" placeholder="NIC / Passport No" name="NIC_Pass_no" />
			</FormGroup>

			<FormGroup>
			<span>NIC / Passport Copy</span> &nbsp; 
			<input style={{display :'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput } />
			<Button onClick={()=>this.fileInput.click()} >
			      <Icon type="upload" />Choose Image
			</Button> &nbsp;
			<Button onClick={this.fileUploadHandler}> upload </Button>
			</FormGroup>

			<FormGroup bssize="sm">
			  <InputGroup>
			    <InputGroup.Button>
			      	<Button>+94</Button>
			    </InputGroup.Button>
			    <Input onChange={this.handleChange} className="form-control" valid={!this.state.validMonum} type="text" placeholder="Mobile No" name="Mobile_No" />
				<FormFeedback disabled={this.state.Mobile_No === true ? true : false } valid={!this.state.validMonum}>Sweet! that mobile number is valid</FormFeedback>
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
			<FormGroup bssize="sm">
			  	<Input onChange={this.handleChange} className="form-control" type="text" placeholder="Driving Licence No" name="DrivingLiNo"/>
			</FormGroup>

			<FormGroup>
			<span>Driving Licence Copy</span>  &nbsp; 
			<input style={{display :'none'}} type="file" onChange={this.DrivingFileSelecter} ref={fileInput1 => this.fileInput1 = fileInput1 } />
			<Button onClick={()=>this.fileInput1.click()} >
			      <Icon type="upload" />Choose Image
			</Button> &nbsp;
			<Button onClick={this.drivingFileUploadHandler} > upload </Button>
			</FormGroup>

			<FormGroup bssize="sm">
			  <InputGroup>
			    <InputGroup.Button>
			      <Button>+94</Button>
			    </InputGroup.Button>
			    <Input onChange={this.handleChange} valid={!this.state.validLanum} className="form-control" type="text" placeholder="Home No" name="LandPh_No" />
				<FormFeedback valid={!this.state.validLanum}>Sweet! that email is valid</FormFeedback>
			  </InputGroup>
			</FormGroup>

			<FormGroup>
			<span>Vehicle book Copy</span>  &nbsp; 
			<input style={{display :'none'}} type="file" onChange={this.VehicleFileSelecter} ref={fileInput2 => this.fileInput2 = fileInput2 }/>
			<Button onClick={()=>this.fileInput2.click()} >
			      <Icon type="upload" />Choose Image
			</Button> &nbsp;
			<Button onClick={this.VehicleFileUploadHandler}> upload </Button>
			</FormGroup>
			<Input className="btn btn-primary" type="submit" value="Submit" />
		</form>
		</div>
    );
  }
}
export default OwnerDetail;