import React from 'react';
import {Switch ,Route } from 'react-router-dom';
import Slider from './Slider';
import About from './About';
import Car from './Car';
import Rate from './Rate';
import BecomePartner from './BecomePartner';
import CarDetails from './CarDetails';
import Owner from './Owner';
import Fleet from './Fleet';
import Admin from './Admin';
import AdminHome from './AdminHome';
import ManageUser from './ManageUser'
import ManageDriver from './ManageDriver'
import ManageFleetOwnCarUser from './ManageFleetOwnCarUser'
import ManageOwnCarUser from './ManageOwnCarUser'
import Adduser from './Adduser';
import ManageCar from './ManageCar'
import EditUser from './EditUser'
import Footer from './Footer'
import ClassicCar from './ClassicCar'
import LuxuryCar from './LuxuryCar'
import Lumi from './Lumi'
import Sluxury from './Sluxury'
import Delux from './Delux'
import Exotic from './Exotic'
import BookingCar from './BookingCar'

const Main =() =>(
	<main>
		<Switch>
			<Route exact path='/' component={Slider} />
			<Route exact path='/Car' component={Car} />
			<Route exact path='/About' component={About} />
			<Route exact path='/Admin' component={Admin} />
			<Route exact path='/Rate' component={Rate} />
			<Route exact path='/Footer' component={Footer} />
			<Route exact path='/BecomePartner' component={BecomePartner} />
			<Route exact path='/car/classic' component={ClassicCar} />
			<Route exact path='/car/luxury' component={LuxuryCar} />
			<Route exact path='/car/limousine' component={Lumi} />
			<Route exact path='/car/SuperLuxury' component={Sluxury} />
			<Route exact path='/car/Delux' component={Delux} />
			<Route exact path='/car/Exotic' component={Exotic} />
			<Route exact path='/car/:id' component={CarDetails} />
			<Route exact path='/BecomePartner/Owner' component={Owner} />
			<Route exact path='/BecomePartner/Fleet' component={Fleet} />
			<Route exact path='/Admin/AdminHome' component={AdminHome} />
			<Route exact path='/Admin/AdminHome/ManageUser' component={ManageUser} />
			<Route exact path='/Admin/AdminHome/Adduser' component={Adduser} />
			<Route exact path='/Admin/AdminHome/ManageCar' component={ManageCar} />
			<Route exact path='/Admin/AdminHome/ManageDriver' component={ManageDriver} />
			<Route exact path='/Admin/AdminHome/ManageOwnCarUser' component={ManageOwnCarUser} />
			<Route exact path='/Admin/AdminHome/ManageFleetOwnCarUser' component={ManageFleetOwnCarUser} />
			<Route exact path='/Admin/AdminHome/EditUser' component={EditUser} />
			<Route exact path='/Admin/AdminHome/BookingCar' component={BookingCar} />
		</Switch>
	</main>
)

export default Main;