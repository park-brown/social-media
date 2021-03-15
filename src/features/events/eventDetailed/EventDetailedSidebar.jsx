import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

export default function EventDetailedSidebar({ event }) {
	const { attendees } = event;

	return (
		<>
			<Segment
				textAlign='center'
				style={{ border: 'none' }}
				attached='top'
				secondary
				inverted
				color='teal'>
				2 People Going
			</Segment>
			<Segment attached>
				<Item.Group relaxed divided>
					<Item style={{ position: 'relative' }}>
						<Item.Image size='tiny' src={`${attendees[0].photoURL}`} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<span>{attendees[0].name}</span>
							</Item.Header>
						</Item.Content>
					</Item>
					<Item style={{ position: 'relative' }}>
						<Item.Image size='tiny' src={`${attendees[1].photoURL}`} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<span>{attendees[1].name}</span>
							</Item.Header>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
		</>
	);
}
