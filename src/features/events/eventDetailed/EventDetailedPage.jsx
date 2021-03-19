import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleEvent } from '../EventSlice';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function EventDetailedPage({ match }) {
	const {
		params: { id },
	} = match;

	const dispatch = useDispatch();
	const status = useSelector((state) => state.events.status);
	const events = useSelector((state) => state.events.events);
	const event = events.find((item) => item.id === id);
	React.useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchSingleEvent({ id }));
		}
	}, [dispatch, id, status]);

	let content;
	if (status === 'pending') {
		content = <LoadingComponent />;
	} else if (status === 'fulfilled') {
		content = (
			<Grid>
				<Grid.Column width={10}>
					<EventDetailedHeader id={id} event={event} />
					<EventDetailedInfo event={event} />
					<EventDetailedChat />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventDetailedSidebar event={event} />
				</Grid.Column>
			</Grid>
		);
	} else if (status === 'rejected') {
		content = <div> something went wrong </div>;
	}
	return <div>{content}</div>;
}
