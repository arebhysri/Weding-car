import React from 'react';
import {Input, Form, FormGroup,Button } from 'reactstrap';
import { Select, Icon } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Row, Col } from 'antd';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress,geocodeByPlaceId,getLatLng} from 'react-places-autocomplete';

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
      address:''
		}
  }
  
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

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
              <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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

