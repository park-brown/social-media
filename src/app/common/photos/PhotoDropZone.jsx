import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

export default function PhotoDropzone({ setFile }) {
	const dropZoneStyles = {
		border: 'dashed 3px #eee',
		borderRadius: '5%',
		paddingTop: '30px',
		textAlign: 'center',
	};
	const dropZoneActive = {
		border: 'dashed 3px green',
	};
	const onDrop = useCallback(
		(acceptedFiles) => {
			setFile(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					}),
				),
			);
		},
		[setFile],
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div
			{...getRootProps()}
			style={
				isDragActive
					? { ...dropZoneStyles, ...dropZoneActive }
					: { ...dropZoneStyles }
			}>
			<input {...getInputProps()} />
			<Icon name='upload' size='huge' />
			<Header content='drop image here' />
		</div>
	);
}
