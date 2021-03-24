import React from 'react';
import { Button, Grid, GridColumn, Header } from 'semantic-ui-react';
import PhotoCropper from './PhotoCropper';
import PhotoDropzone from './PhotoDropZone';
import cuid from 'cuid';

import { uploadToFirebaseStorage } from '../../firestore/firebaseService';
import { updateUserProfilePhoto } from '../../firestore/firestoreService';

const PhotoUploadWidget = ({ setEditMode }) => {
	const [file, setFile] = React.useState([]);
	const [image, setImage] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	function getFileExtension(filename) {
		return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
	}
	function cancelCrop() {
		setFile([]);
		setImage(null);
	}

	const handleUpLoadImage = () => {
		setLoading(true);
		const filename = cuid() + '.' + getFileExtension(file[0].name);
		const uploadTask = uploadToFirebaseStorage(image, filename);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`upload is ${progress} done`);
			},
			(error) => {
				console.log(error);
			},
			() => {
				uploadTask.snapshot.ref
					.getDownloadURL()
					.then((downloadURL) => {
						updateUserProfilePhoto(downloadURL, filename).then(() => {
							setLoading(false);
							cancelCrop();
							setEditMode(false);
						});
					})
					.catch((error) => {
						console.log(error);
						setLoading(false);
					});
			},
		);
	};
	return (
		<Grid>
			<GridColumn width={4}>
				<Header color='teal' sub content='step 1 - Add Photo' />
				<PhotoDropzone setFile={setFile} />
			</GridColumn>
			<GridColumn width={1} />
			<GridColumn width={4}>
				<Header color='teal' sub content='step 2 - Resize' />
				{file.length > 0 && (
					<PhotoCropper setImage={setImage} imagePreview={file[0].preview} />
				)}
			</GridColumn>
			<GridColumn width={1} />
			<GridColumn width={4}>
				<Header color='teal' sub content='step 3 - Preview & Upload' />
				{file.length > 0 && (
					<React.Fragment>
						<div
							className='img-preview'
							style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
						/>
						<Button.Group>
							<Button
								loading={loading}
								onClick={handleUpLoadImage}
								style={{ width: 100 }}
								positive
								icon='check'
							/>
							<Button
								disabled={loading}
								onClick={cancelCrop}
								style={{ width: 100 }}
								icon='close'
							/>
						</Button.Group>
					</React.Fragment>
				)}
			</GridColumn>
		</Grid>
	);
};

export default PhotoUploadWidget;
