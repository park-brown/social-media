import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import * as Yup from 'yup';
import { addEventToFirestore, updateEventInFirestore } from '../EventSlice';
import MytextInput from '../../../../src/app/common/Form/MyTextInput';
import MytextArea from '../../../app/common/Form/MyTextArea';
import MySelect from '../../../app/common/Form/MySelect';
import { categoryData } from '../../../app/api/category';

import MydatePicker from '../../../app/common/Form/MydatePicker';
export default function EventForm({ match, history }) {
	const {
		params: { id },
	} = match;
	const events = useSelector((state) => state.events.events);

	const event = events && events.find((e) => e.id === id);
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

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					id
						? dispatch(updateEventInFirestore({ id, values }))
						: dispatch(addEventToFirestore({ values }));
					setSubmitting(false);
					history.push('/events');
				}}>
				{({ isSubmitting, dirty, isValid }) => (
					<Form className='ui form'>
						<Header content='event detail' color='teal' sub />
						<MytextInput name='title' placeholder='title' />
						<MySelect
							name='category'
							placeholder='category'
							options={categoryData}
						/>
						<MytextArea name='description' placeholder='description' rows={3} />
						<Header content='location detail' color='teal' sub />
						<MytextInput name='city' placeholder='city' />
						<MytextInput name='venue' placeholder='venue' />
						<MydatePicker
							name='date'
							placeholderText='choose date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm:a'
						/>

						<Button
							type='submit'
							floated='right'
							positive
							content='Submit'
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
						/>
						<Button
							disabled={isSubmitting}
							as={Link}
							to='/events'
							type='submit'
							floated='right'
							content='Cancel'
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
}
