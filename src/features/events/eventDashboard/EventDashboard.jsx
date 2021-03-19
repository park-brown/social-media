import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';

import { useSelector, useDispatch } from 'react-redux';

import { fetchEvent } from '../EventSlice';

export default function EventDashboard() {
	// const [events, setEvents] = useState(sampleData);
	const events = useSelector((state) => state.events.events);
	const status = useSelector((state) => state.events.status);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchEvent());
		}
	}, [dispatch, status]);

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList events={events} />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Event Filters</h2>
			</Grid.Column>
		</Grid>
	);
}
