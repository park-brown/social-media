import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ModalWrapper from '../../app/common/Modals/ModalWrapper';
import MytextInput from '../../app/common/Form/MyTextInput';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { user_sign_in } from './authSlice';
import { close_Modal } from '../../app/common/Modals/Modal_Slice';
const Login = () => {
	const dispatch = useDispatch();
	return (
		<ModalWrapper size='mini' header='Sign in'>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(user_sign_in(values));
					setSubmitting(false);
					dispatch(close_Modal());
				}}>
				{({ isSubmitting, isValid, dirty }) => (
					<Form className='ui form'>
						<MytextInput name='email' placeholder='email address' />
						<MytextInput
							name='password'
							placeholder='password'
							type='password'
						/>
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='login'
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
};

export default Login;
