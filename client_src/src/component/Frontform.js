import React from 'react';
import { Form, FormGroup,Button } from 'reactstrap';
import { Select, Icon } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Row, Col } from 'antd';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

export default class Frontform extends React.Component {
  state = {
    size: 'large',
  };
  constructor(props){
		super(props);
		this.state = {
      location : '',
      carType:'',
		}
	}
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  
  onChangeDate=(value, dateString)=>{
    this.setState({
      startDate : dateString[0],
      endDate :dateString[1]
    })
    
  }
  
  onOk(value) {
    console.log('onOk: ', value);
  }
  handleChange1=(value)=> {
		//var carType =`${value}`;
		this.setState({
			carType: value
    })
    
		//console.log(value)
  }
  handleChange2=(value)=> {
		//var carType =`${value}`;
		this.setState({
			location: value
    })
    
		//console.log(value)
	}
  render() {
    const size = this.state.size;
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.carType);
    console.log(this.state.location);
    return (
    <Row className="in" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <Col push={24}>
      <div >
        <Form inline >
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Select size={"large"}
                showSearch
                style={{ width: 200 }}
                placeholder="Pick your Loacation"
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
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <RangePicker size={"large"}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start Time', 'End Time']}
            onChange={this.onChangeDate}
            onOk={this.onOk}
            name="startDate"
          />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Select size={"large"}
            showSearch
            style={{ width: 200 }}
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
          <Button style={{ width: 150 }} size={size} className="bg-primary">Submit  <Icon type="paper-clip" /></Button>
        </Form>
      </div>
    </Col >
    </Row >
    );
  }
}

