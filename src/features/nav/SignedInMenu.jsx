import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { user_signOut_firebase } from '../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function SignedInMenu() {
	const dispatch = useDispatch();
	const current_user = useSelector((state) => state.auth.current_user);
	const { uid, displayName } = current_user;
	const handleSignOut = () => {
		dispatch(user_signOut_firebase());
		history.push('/');
	};
	const history = useHistory();

	return (
		<Menu.Item position='right'>
			<Image avatar spaced='right' src={current_user.photoURL} />
			<Dropdown pointing='top left' text={`${displayName}`}>
				<Dropdown.Menu>
					<Dropdown.Item
						as={Link}
						to='/createEvent'
						text='Create Event'
						icon='plus'
					/>
					<Dropdown.Item
						as={Link}
						to={`/profile/${uid}`}
						text='My profile'
						icon='user'
					/>
					<Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
