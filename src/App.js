import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EventDashboard from './component/EventDashboard/EventDashboard';
import EventDetail from './component/EventDetailPage/EventDetail';
import EventForm from './component/EventForm/EventForm';
import HomePage from './component/home/HomePage';
import NavBar from './component/NavBar/NavBar';
import PeopleDashboard from './component/User/PeopleDashboard/PeopleDashboard';
import SettingDashBoard from './component/User/Settings/SettingDashBoard/SettingDashBoard';
import UserDetail from './component/User/UserDetail/UserDetailPage/UserDetail';
function App() {
	return (
		<Router>
			<Switch>
				<Route
					path='/(.+)'
					render={() => (
						<React.Fragment>
							<NavBar />
							<Route path='/events/:id' component={EventDetail} />
							<Route path='/events' component={EventDashboard} />
							<Route path='/people' component={PeopleDashboard} />
							<Route path='/profile/:id' component={UserDetail} />
							<Route path='/settings' component={SettingDashBoard} />
							<Route path='/createEvent' component={EventForm} />
						</React.Fragment>
					)}
				/>

				<Route path='/' component={HomePage} />
			</Switch>
		</Router>
	);
}

export default App;
