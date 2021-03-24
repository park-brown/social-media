import React, { useState } from 'react';
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PhotoUploadWidget from '../../app/common/photos/PhotoUploadWidget';
import {
	delete_user_photo,
	get_user_photo,
	get_user_profile,
} from './profileSlice';
import { setMainPhoto } from '../../app/firestore/firestoreService';
export default function PhotosTab({ profile }) {
	const [editMode, setEditMode] = useState(false);
	const [updating, setUpdateing] = useState(false);
	const dispatch = useDispatch();
	const current_user_id = useSelector((state) => state.auth.current_user.uid);
	const profile_id = useSelector(
		(state) => state.profile.current_user_profile.uid,
	);
	const match = Boolean(current_user_id === profile_id);
	React.useEffect(() => {
		dispatch(get_user_photo({ id: profile_id }));
	}, [dispatch, profile_id]);
	const photos = useSelector((state) => state.profile.photos);

	async function trigger_setMainPhoto(photo) {
		setUpdateing(true);
		try {
			await setMainPhoto(photo);
		} catch (error) {
			console.log(error);
		} finally {
			setUpdateing(false);
		}
	}
	const delele_photo = (photo) => {
		dispatch(delete_user_photo({ id: photo.id }));
	};
	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='user' content={'photos'} />
					{match ? (
						<Button
							onClick={() => setEditMode(!editMode)}
							floated='right'
							basic
							content={editMode ? 'Cancel' : 'Add photo'}
						/>
					) : null}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<PhotoUploadWidget setEditMode={setEditMode} />
					) : (
						<Card.Group itemsPerRow={5}>
							{photos.map((photo) => (
								<Card key={photo.name}>
									<Image src={photo.url} />
									<Button.Group fluid widths={2}>
										<Button
											loading={updating}
											onClick={() => {
												trigger_setMainPhoto(photo);
												dispatch(get_user_profile({ id: current_user_id }));
											}}
											basic
											color='green'
											content='Main'
										/>
										<Button
											onClick={() => {
												delele_photo(photo);
											}}
											basic
											color='red'
											icon='trash'
										/>
									</Button.Group>
								</Card>
							))}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}
