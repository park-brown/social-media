import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ProfileContent from './PofileContent';
import ProfileHeader from './ProfileHeader';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_profile } from './profileSlice';
const ProfilePage = ({ match }) => {
	const dispatch = useDispatch();
	const current_user_profile = useSelector(
		(state) => state.profile.current_user_profile,
	);
	const status = useSelector((state) => state.profile.status);
	React.useEffect(() => {
		if (status === 'idle') {
			dispatch(get_user_profile({ id: match.params.id }));
		}
	}, [status, dispatch, match.params.id]);

	let content;

	if (status === 'pending') {
		content = <LoadingComponent />;
	} else if (status === 'succeeded') {
		content = (
			<Grid>
				<GridColumn width={16}>
					<ProfileHeader profile={current_user_profile} />
					<ProfileContent profile={current_user_profile} />
				</GridColumn>
			</Grid>
		);
	} else if (status === 'failed') {
		content = <div>something went wrong </div>;
	}
	return <React.Fragment>{content}</React.Fragment>;
};

export default ProfilePage;
