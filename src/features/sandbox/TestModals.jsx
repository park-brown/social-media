import React from 'react';
import ModalWrapper from '../../app/common/Modals/ModalWrapper';

const TestModals = ({ data }) => {
	return (
		<ModalWrapper size='mini' header='test header'>
			<div>the data is: {data}</div>
		</ModalWrapper>
	);
};

export default TestModals;
