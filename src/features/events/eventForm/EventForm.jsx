import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import cuid from 'cuid';
import * as Yup from 'yup';
import { update_event, add_event } from '../EventSlice';
import MytextInput from '../../../../src/app/common/Form/MyTextInput';
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
	const validationSchema = Yup.object({
		title: Yup.string().required('your must provide a title'),
		category: Yup.string().required('your must provide a category'),
		description: Yup.string().required(),
		city: Yup.string().required(),
		venue: Yup.string().required(),
		date: Yup.string().required(),
	});

	// const handleSubmit = () => {
	// 	id
	// 		? dispatch(update_event({ id, values }))
	// 		: dispatch(add_event({ values }));
	// 	history.push('/events');
	// };
	// const [values, setValues] = React.useState(initialValues);
	// function handleInputChange(e) {
	// 	const { name, value } = e.target;
	// 	setValues({ ...values, [name]: value });
	// }

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					id
						? dispatch(update_event({ id, values }))
						: dispatch(
								add_event({
									values,
									id: cuid(),
									hostedBy: Blob,
									attendees: [],
									hostPhotoURL: '',
								}),
						  );
					history.push('/events');
				}}>
				<Form className='ui form'>
					<Header content='event detail' color='teal' sub />
					<MytextInput name='title' placeholder='title' />
					<MytextInput name='category' placeholder='category' />
					<MytextInput name='description' placeholder='description' />
					<Header content='location detail' color='teal' sub />
					<MytextInput name='city' placeholder='city' />
					<MytextInput name='venue' placeholder='venue' />
					<MytextInput name='date' type='date' placeholder='date' />

					<Button type='submit' floated='right' positive content='Submit' />
					<Button
						as={Link}
						to='/events'
						type='submit'
						floated='right'
						content='Cancel'
					/>
				</Form>
			</Formik>
		</Segment>
	);
}
