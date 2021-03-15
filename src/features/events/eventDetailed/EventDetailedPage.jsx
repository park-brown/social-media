import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useSelector } from 'react-redux';

export default function EventDetailedPage({ match }) {
	const {
		params: { id },
	} = match;
	const events = useSelector((state) => state.events);
	const event = events.find((item) => item.id === id);

	return (
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
}
