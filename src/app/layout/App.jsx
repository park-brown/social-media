import React from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import ModalManager from '../common/Modals/ModalManager';
import firebase from '../api/config/firebase';
import { useDispatch } from 'react-redux';
import { user_sign_in, user_sign_out } from '../../features/auth/authSlice';
export default function App() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				dispatch(user_sign_in(user));
			} else {
				dispatch(user_sign_out());
			}
		});
		return () => {
			unsubscribe();
		};
	}, [dispatch]);
	return (
		<>
			<ModalManager />
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar />
						<Container className='main'>
							<Route exact path='/events' component={EventDashboard} />
							<Route path='/events/:id' component={EventDetailedPage} />
							<Route
								path={['/createEvent', '/manage/:id']}
								component={EventForm}
							/>
						</Container>
					</>
				)}
			/>
		</>
	);
}
