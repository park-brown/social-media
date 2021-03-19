import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { close_Modal } from './Modal_Slice';

const ModalWrapper = ({ children, size, header }) => {
	const dispatch = useDispatch();
	return (
		<Modal open={true} onClose={() => dispatch(close_Modal())} size={size}>
			{header && <Modal.Header>{header}</Modal.Header>}
			<Modal.Content>{children}</Modal.Content>
		</Modal>
	);
};

export default ModalWrapper;
