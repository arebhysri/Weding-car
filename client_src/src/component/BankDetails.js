import React, { Component } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Icon ,Input} from 'antd';
import { FormGroup} from 'reactstrap';
import {Button} from 'react-bootstrap';
 
class BankDetails extends Component {
	constructor(props){
		super(props);
		this.state = {
			ownerName : localStorage.getItem('data'),
			accountName : '',
			bankName : '' , 
			bankBookCpy : '' ,
			accountNo : '' ,
			branch : '' , 
			BankList : '',
			selectedFile : null,
		}
	}
	handlelogin = () => {
		this.setState({
		  isLoggedIn : true
	
		})
	}
	
	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append('image',this.state.selectedFile, this.state.selectedFile.name )
		axios.post('http://localhost:3000/api/attachmentBanks/bankBookCpy/upload',fd , {
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
			url:'http://localhost:3000/api/ownerBankDetails',
			data : newBank
		}).then(response => {
			console.log(response.data);
		}).catch(err => console.log(err));
	}
	onSubmit(e){
		const newBank = {
			ownerName: this.state.ownerName,
			accountName : this.state.accountName,
			bankName : this.state.bankName,
			branch : this.state.branch,
			accountNo : this.state.accountNo,
			bankBookCpy : this.state.BankList
		}
		console.log(newBank);
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
			
			<input onChange={this.handleChange} className="form-control" type="text" value={this.state.ownerName} placeholder="Owner Name" name="ownerName" />
			
			</FormGroup>
			<FormGroup bssize="sm">
			  	<input onChange={this.handleChange} className="form-control" type="text" placeholder="Account Name" name="accountName"  />
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
export default BankDetails;