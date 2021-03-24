import React, { useState } from 'react';
import { Grid, Header, Button, Tab } from 'semantic-ui-react';
import { format } from 'date-fns';
import ProfileForm from './ProfileForm';
import { useSelector } from 'react-redux';

export default function AboutTab({ profile }) {
	const [editMode, setEditMode] = useState(false);
	const current_user_id = useSelector((state) => state.auth.current_user.uid);
	const profile_id = useSelector(
		(state) => state.profile.current_user_profile.uid,
	);
	const match = Boolean(current_user_id === profile_id);

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated='left'
						icon='user'
						content={`About ${profile.displayName}`}
					/>
					{match ? (
						<Button
							onClick={() => setEditMode(!editMode)}
							floated='right'
							basic
							content={editMode ? 'Cancel' : 'Edit'}
						/>
					) : null}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<ProfileForm profile={profile} />
					) : (
						<>
							<div style={{ marginBottom: 10 }}>
								<strong>
									Member since: {format(profile.createdAt, 'dd MMM yyyy')}
								</strong>
								<div>{profile.description || null}</div>
							</div>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}
