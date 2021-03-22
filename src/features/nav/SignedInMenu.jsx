import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { user_signOut_firebase } from '../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function SignedInMenu() {
	const dispatch = useDispatch();
	const user_name = useSelector((state) => state.auth.current_user.displayName);
	const handleSignOut = () => {
		dispatch(user_signOut_firebase());
		history.push('/');
	};
	const history = useHistory();

	return (
		<Menu.Item position='right'>
			<Image avatar spaced='right' src='/assets/user.png' />
			<Dropdown pointing='top left' text={`${user_name}`}>
				<Dropdown.Menu>
					<Dropdown.Item
						as={Link}
						to='/createEvent'
						text='Create Event'
						icon='plus'
					/>
					<Dropdown.Item text='My profile' icon='user' />
					<Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
