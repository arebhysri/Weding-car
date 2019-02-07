import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Icon ,Select,DatePicker} from 'antd';
import {FormGroup,Col,Row,Input} from 'reactstrap';
import {Button,InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { json } from 'body-parser';

const Option = Select.Option;

class FleetCarDetail extends Component {
	state = {
		size: 'default',
	};


	constructor(props){
		super(props);
		this.state = {
			brand : '',
			model : '',
			color : '' , 
			regiNo : '' ,
			revenue_li_cpy : '' ,
			revenue_li_ex_date : '' , 
			ins_cpy : '',
			ins_exp_date :'',
			car_photo : [],
			NIC_Pass_no : '',
			ownerID:'',
			revenue_Licence_Copy : null,
			insurence_Copy : null,
			Car_Image : [],
			OwnerName : localStorage.getItem('data'),
			carType : []
		}
	}

	handleChange1=(value)=> {
		this.setState({
			carType: value
		})
	}

	handlelogin = () => {
		this.setState({
		  isLoggedIn : true
	
		})
	}

	handleChange = event => {
		this.setState({ 
			[event.target.name]: event.target.value
		});
	};

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
	}

	fileUploadLicenceExp = () => {
		const fd = new FormData();
		fd.append('image',this.state.revenue_Licence_Copy, this.state.revenue_Licence_Copy.name )
		axios.post('http://localhost:3000/api/attachmentBanks/revenue_Licence_Copy/upload',fd , {
			onUploadProgress : ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
		.then(res => {
			this.setState({
				revenue_li_cpy: res.data.result.files.image[0].name,
			});
			
		});
	}

	fileSelectedLicenceExp = event =>{
		this.setState({
			revenue_Licence_Copy: event.target.files[0]
		})
		
	}

	fileUploadInsurenceExp = () => {
		const fd = new FormData();
		fd.append('image1',this.state.insurence_Copy, this.state.insurence_Copy.name )
		axios.post('http://localhost:3000/api/attachmentBanks/insurence_Copy/upload',fd , {
			onUploadProgress : ProgressEvent => {
				console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
			}
		})
		.then(res => {
			this.setState({
				ins_cpy: res.data.result.files.image1[0].name,
			});
			
		});
	}

	fileSelectedInsurenceExp = event =>{
		this.setState({
			insurence_Copy: event.target.files[0]
		})
		
	}

	fileSelectedCarImg = event =>{
		
		const file = Array.from(event.target.files);
    this.setState({ file })
	}

	fileUploadCarImg =()=>{
		const myArray = []
		for (let index = 0; index < this.state.file.length; index++) {
			const element = this.state.file[index];
			const fd = new FormData();
			fd.append('image2',element,element.name )
			axios.post('http://localhost:3000/api/attachmentBanks/Car_Image/upload',fd , {
				onUploadProgress : ProgressEvent => {
					console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
				}
			})
			.then(res => {
				myArray.push(res.data.result.files.image2[0].name)
				console.log("uploaded")
				this.setState({myArray})
			});
			
		}
		/*const names =this.state.file.map((files) => files.name);
		this.setState({ names })*/
	}
	handleDatePickerChange(dateString) {
		//console.log(date, dateString);
		this.setState({
			revenue_li_ex_date : dateString
		})	
	}
	handleDatePickerChange1(dateString) {
		//console.log(date, dateString);
		this.setState({
			ins_exp_date : dateString
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
	AddCarDetail(newCar){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/cars',
			data : newCar
		}).then(response => {
			console.log(response.data);
		}).catch(err => console.log(err));
	}
	
	onSubmit(e){
		//console.log(this.state.car_photo)
		const newCar = {
			brand : this.state.brand,
			model : this.state.model,
			color : this.state.color , 
			regiNo : this.state.regiNo ,
			revenue_li_cpy : this.state.revenue_li_cpy ,
			revenue_li_ex_date : this.state.revenue_li_ex_date , 
			ins_cpy : this.state.ins_cpy,
			ins_exp_date :this.state.ins_exp_date,
			car_photo : (this.state.myArray),
			ownerNICId_companyName : this.state.companyName,
			carType : this.state.carType
		}
		console.log(newCar)
		this.AddCarDetail(newCar);
		e.preventDefault();

		
	}

  render() {
	const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
  return (
	  <div>
	  <h4 style={{ textAlign : 'justify', fontFamily: 'MarkPro Medium', fontSize: '15', textAlign: 'center'}}>Car Details</h4>
		<form onSubmit ={this.onSubmit.bind(this)}>
			<FormGroup>
			  <Input onChange={this.handleChange} className="form-control" type="text" placeholder="Car Brand" name="brand"/>
			</FormGroup>
			<FormGroup>
			  <Input onChange={this.handleChange} className="form-control" type="text" placeholder="Car Model" name="model"/>
			</FormGroup>
			<FormGroup>
			  <Input onChange={this.handleChange} className="form-control" type="text" placeholder="Car Color" name="color"/>
			</FormGroup>
			<FormGroup>
			  <Input onChange={this.handleChange} className="form-control" type="text" placeholder="Car Registration No" name="regiNo"/>
			</FormGroup>
			<Row form>
        		<Col md={6}>
					<FormGroup>
					<span>Car Revenue Licence Copy</span> <br/>
					<input style={{display :'none'}} type="file" onChange={this.fileSelectedLicenceExp} ref={fileInput => this.fileInput = fileInput } />
					<Button onClick={()=>this.fileInput.click()} >
								<Icon type="upload" />Choose Image
					</Button> &nbsp;
					<Button onClick={this.fileUploadLicenceExp}> upload </Button>
					</FormGroup>
				</Col>

			<Col md={6}>
				<FormGroup>
				<label>Car Revenue Licence Expiry Date</label> 
				<DatePicker size={"large"}
					placeholder = "Pick your revenue licence expiry date"
					name="revenue_li_ex_date" onChange={(date, dateString) => this.handleDatePickerChange(dateString)} />
				</FormGroup>
			</Col>
			</Row>
			<Row form>
			<Col md={6}>
			<FormGroup>
			<span>Insurence Copy</span> <br/>
				<input style={{display :'none'}} type="file" onChange={this.fileSelectedInsurenceExp} ref={fileInput2 => this.fileInput2 = fileInput2 } />
				<Button onClick={()=>this.fileInput2.click()} ><Icon type="upload" />Choose Image
				</Button> &nbsp;
				<Button onClick={this.fileUploadInsurenceExp}> upload </Button>
			</FormGroup>
			</Col>
			<Col md={6}>
			<FormGroup>
			<label>Car Insurence Exiry Date</label> 
			<DatePicker size={"large"}
				name="carInsExp" onChange={(date, dateString) => this.handleDatePickerChange1(dateString)} />
			</FormGroup>
			</Col>
			</Row>
			
			<Row form>
			<Col md={6}>
			<FormGroup>
			<span>Car Image</span> 
				<input multiple style={{display :'none'}} type="file" onChange= { this.fileSelectedCarImg} ref={fileInput3 => this.fileInput3 = fileInput3 }  />
				<Button onClick={()=>this.fileInput3.click()} ><Icon type="upload" />Choose Image
				</Button> &nbsp;
				<Button onClick={this.fileUploadCarImg}> upload </Button>
			</FormGroup>
			</Col>
			<Col md={6}>
			<FormGroup>
			<Select
				showSearch
				style={{ width: 340 }}
				placeholder="Select Your Car Type"
				optionFilterProp="children"
				onChange={this.handleChange1}
				filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			>
				<Option value="classic">Classic</Option>
				<Option value="deluxe">Deluxe</Option>
				<Option value="luxury">Luxury</Option>
				<Option value="superLuxury">Super Luxury</Option>
				<Option value="limousine">Limousine</Option>
				<Option value="exoticCars">Exotic Cars</Option>
			</Select>
				
			</FormGroup>
			</Col>
			</Row>
			<FormGroup>
				<input className="form-control" onChange={this.handleChange} value={this.state.companyName} placeholder="Owner Name" type="hidden" name="ownerNICId_companyName"/>
			</FormGroup>
				<Input className="btn btn-primary" type="submit" value="Submit" />
		</form>
		</div>
    );
  }
}
export default FleetCarDetail;