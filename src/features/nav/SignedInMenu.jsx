import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { user_sign_out } from '../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function SignedInMenu() {
	const dispatch = useDispatch();
	const current_user = useSelector((state) => state.auth.current_user);
	const history = useHistory();

	return (
		<Menu.Item position='right'>
			<Image avatar spaced='right' src='/assets/user.png' />
			<Dropdown pointing='top left' text='Bob'>
				<Dropdown.Menu>
					<Dropdown.Item
						as={Link}
						to='/createEvent'
						text='Create Event'
						icon='plus'
					/>
					<Dropdown.Item text='My profile' icon='user' />
					<Dropdown.Item
						onClick={() => {
							dispatch(user_sign_out());
							history.push('/');
						}}
						text='Sign out'
						icon='power'
					/>
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
