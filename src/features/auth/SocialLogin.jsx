import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { close_Modal } from '../../app/common/Modals/Modal_Slice';
import { Social_Login } from './authSlice';
const SocialLogin = () => {
	const dispatch = useDispatch();
	const handleSocialLogin = (provider) => {
		dispatch(close_Modal());
		Social_Login(provider);
	};
	return (
		<React.Fragment>
			<Button
				onClick={() => handleSocialLogin('facebook')}
				icon='facebook'
				fluid
				color='facebook'
				style={{ marginBottom: 10 }}
				content='Login with Facebook'
			/>
			<Button
				onClick={() => handleSocialLogin('google')}
				icon='google'
				fluid
				color='google plus'
				content='Login with Google'
			/>
		</React.Fragment>
	);
};

export default SocialLogin;
