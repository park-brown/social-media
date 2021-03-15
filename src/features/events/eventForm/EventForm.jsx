import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update_event, add_event } from '../EventSlice';
export default function EventForm({ match, history }) {
	const {
		params: { id },
	} = match;
	const events = useSelector((state) => state.events);
	const event = events.find((e) => e.id === id);
	const dispatch = useDispatch();
	const initialValues = event ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venue: '',
		date: '',
	};

	const [values, setValues] = React.useState(initialValues);

	const handleSubmit = () => {
		id
			? dispatch(update_event({ id, values }))
			: dispatch(add_event({ values }));
		history.push('/events');
	};
	function handleInputChange(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	return (
		<Segment clearing>
			<Header content={id ? 'Edit the event' : 'Create new event'} />
			<Form onSubmit={handleSubmit}>
				<Form.Field>
					<input
						type='text'
						placeholder='Event title'
						name='title'
						value={values.title}
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='Category'
						name='category'
						value={values.category}
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='Description'
						name='description'
						value={values.description}
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='City'
						name='city'
						value={values.city}
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='Venue'
						name='venue'
						value={values.venue}
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='date'
						placeholder='Date'
						name='date'
						value={values.date}
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Button type='submit' floated='right' positive content='Submit' />
				<Button
					as={Link}
					to='/events'
					type='submit'
					floated='right'
					content='Cancel'
					onClick={() => {
						history.push(`/events/${id}`);
					}}
				/>
			</Form>
		</Segment>
	);
}
