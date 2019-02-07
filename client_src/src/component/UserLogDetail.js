import React,{Component} from 'react';

class UserLogDetail extends Component{

	render(){
        let dataUser=sessionStorage.getItem('userName');
        console.log(dataUser)
		return(
			<div>
				<h1> {dataUser} </h1>
			</div>
		)
	}
}

export default UserLogDetail;