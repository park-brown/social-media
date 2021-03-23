import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextArea from '../../app/common/Form/MyTextArea';
import MyTextInput from '../../app/common/Form/MyTextInput';
import { useDispatch } from 'react-redux';
import { update_user_profile } from './profileSlice';

const ProfileForm = ({ profile }) => {
	const dispatch = useDispatch();
	return (
		<Formik
			initialValues={{
				displayName: profile.displayName,
				description: profile.description || '',
			}}
			validationSchema={Yup.object({
				displayName: Yup.string().required(),
			})}
			onSubmit={(values, { setSubmitting }) => {
				dispatch(update_user_profile({ values }));
				setTimeout(() => {
					setSubmitting(false);
				}, 1000);
			}}>
			{({ isSubmitting, isValid, dirty }) => (
				<Form className='ui form'>
					<MyTextInput name='displayName' placeholder='Display Name' />
					<MyTextArea name='description' placeholder='Description' />
					<Button
						loading={isSubmitting}
						disabled={isSubmitting || !isValid || !dirty}
						floated='right'
						type='submit'
						size='large'
						positive
						content='Update profile'
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ProfileForm;
