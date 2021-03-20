import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { deleteEventInFirestore } from '../EventSlice';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
export default function EventListItem({ event }) {
	const dispatch = useDispatch();
	const { id } = event;

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size='tiny' circular src={event.hostPhotoURL} />
						<Item.Content>
							<Item.Header content={event.title} />
							<Item.Description>Hosted by {event.hostedBy}</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')}
					<Icon name='marker' /> {event.venue}
				</span>
			</Segment>
			<Segment secondary>
				<List horizontal>
					{Boolean(event.attendee) ||
						event.attendees.map((attendee) => (
							<EventListAttendee key={attendee.name} attendee={attendee} />
						))}
				</List>
			</Segment>
			<Segment clearing>
				<div>{event.description}</div>
				<Button
					color='red'
					floated='right'
					content='Delete'
					onClick={() => {
						dispatch(deleteEventInFirestore({ id }));
					}}
				/>
				<Button
					as={Link}
					to={`/events/${event.id}`}
					color='teal'
					floated='right'
					content='View'
				/>
			</Segment>
		</Segment.Group>
	);
}
