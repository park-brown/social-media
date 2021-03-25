import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';

import { fetchEvent } from '../EventSlice';
import EventFilters from './EventFilter';

export default function EventDashboard() {
	const events = useSelector((state) => state.events.events);
	const status = useSelector((state) => state.events.status);
	const dispatch = useDispatch();
	const [predicate, setPredicate] = useState(
		new Map([
			['startDate', new Date()],
			['filter', 'all'],
		]),
	);

	function handleSetPredicate(key, value) {
		setPredicate(new Map(predicate.set(key, value)));
	}

	React.useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchEvent());
		}
	}, [dispatch, status]);
	let content;
	if (status === 'pending') {
		content = <LoadingComponent />;
	} else if (status === 'fulfilled') {
		content = (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventFilters
						predicate={predicate}
						setPredicate={handleSetPredicate}
					/>
				</Grid.Column>
			</Grid>
		);
	} else if (status === 'failed') {
		content = <div>something went wrong</div>;
	}

	return <React.Fragment>{content}</React.Fragment>;
}
