import React from 'react';
import { useSelector } from 'react-redux';
import EventListItem from './EventListItem';

export default function EventList() {
	const events = useSelector((state) => state.events.events);

	return (
		<>
			{events.map((event) => (
				<EventListItem event={event} key={event.id} />
			))}
		</>
	);
}
