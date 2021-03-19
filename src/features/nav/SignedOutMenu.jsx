import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Button } from 'semantic-ui-react';
import { open_Modal } from '../../app/common/Modals/Modal_Slice';

export default function SignedOutMenu() {
	const dispatch = useDispatch();
	return (
		<Menu.Item position='right'>
			<Button
				onClick={() => {
					dispatch(open_Modal({ modalType: 'Login' }));
				}}
				basic
				inverted
				content='Login'
			/>
			<Button
				basic
				inverted
				content='Register'
				style={{ marginLeft: '0.5em' }}
			/>
		</Menu.Item>
	);
}
