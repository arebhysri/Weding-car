import React, { Component } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Icon ,Input} from 'antd';
import { FormGroup} from 'reactstrap';
import {Button} from 'react-bootstrap';
 
class FleetBankDetail extends Component {
	constructor(props){
		super(props);
		this.state = {
			companyName : '',
			AccountName : '',
			bankName : '' , 
			bankBookCpy : '' ,
			accountNo : '' ,
			branch : '' , 
			BankList : '',
            selectedFile : null,
			OwnerName : localStorage.getItem('data'),
			
		}
    }
    handlelogin = () => {
		this.setState({
		  isLoggedIn : true
	
		})
    }
    componentDidMount() {
		let ownerID = this.state.OwnerName;
		axios.get(`http://localhost:3000/api/fleetOwners/findOne?filter={"where":{"OwnerName":"${ownerID}"}}`)
		.then(response => {
			this.setState({
				companyName: response.data.companyName
			}, () => {
				console.log(this.state.companyName);
			})
		})
		.catch(err => console.log(err));
	}
	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append('image',this.state.selectedFile, this.state.selectedFile.name )
		axios.post('http://localhost:3000/api/attachmentBanks/fleetbankBookCpy/upload',fd , {
			onUploadProgress : ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
		.then(res => {
			this.setState({
				BankList: res.data.result.files.image[0].name,
			});
			
		});
	}

	fileSelectedHandler = event =>{
		this.setState({
			selectedFile: event.target.files[0]
		})
		
	}
	
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	
	AddBankDetail(newBank){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/companyBankDetails',
			data : newBank
		}).then(response => {
			console.log(response.data);
		}).catch(err => console.log(err));
	}
	onSubmit(e){
		const newBank = {
			companyName: this.state.companyName,
			AccountName : this.state.AccountName,
			bankName : this.state.bankName,
			branch : this.state.branch,
			accountNo : this.state.accountNo,
			bankBookCpy : this.state.BankList,
			
		}
		this.AddBankDetail(newBank);
		e.preventDefault();

		
	}


	  	render() {
			
    	return (
	    <div>
		<div id="BankList"></div>
	    <h4 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}>Bank Details</h4>
		<form onSubmit ={this.onSubmit.bind(this)} >
			<FormGroup bssize="sm">
			
			<input onChange={this.handleChange} className="form-control" type="text" value={this.state.companyName} placeholder="Company Name" name="companyName" />
			
			</FormGroup>
			<FormGroup bssize="sm">
			  	<input onChange={this.handleChange} className="form-control" type="text" placeholder="Account Name" name="AccountName"  />
			</FormGroup>
			<FormGroup bssize="sm">
			    <input onChange={this.handleChange} className="form-control" type="text" placeholder="Bank Name" name="bankName" />
			</FormGroup>
			<FormGroup bssize="sm">
			  	<input onChange={this.handleChange} className="form-control" type="text" placeholder="Branch" name="branch"/>
			</FormGroup>
			<FormGroup bssize="sm">
			  	<input onChange={this.handleChange} className="form-control" type="text" placeholder="Account Number" name="accountNo" />
			</FormGroup>
			<FormGroup>
				
			<span>Bank Book Copy</span>  &nbsp; 
			<input style={{display :'none'}} type="file" id="file"  onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput } encType="multipart/form-data" />
			<Button onClick={()=>this.fileInput.click()} >
			      <Icon type="upload" />Choose Image
			</Button> &nbsp;
			<Button onClick={this.fileUploadHandler}> upload </Button>
			
			</FormGroup>
				<Input  className="btn btn-primary" bsstyle="success" name="submit" type="submit" value="Submit" />
			</form>
		</div>
    );
  }
}
export default FleetBankDetail;