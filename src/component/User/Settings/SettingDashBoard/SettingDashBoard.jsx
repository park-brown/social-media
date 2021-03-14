import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Box } from '@material-ui/core';
import SettingNav from '../SettingNav/SettingNav';
import BasicPage from '../BasicPage/BasicPage';
import { Route, Redirect, Switch } from 'react-router-dom';
import AboutPage from '../AboutPage/AboutPage';
import PhotoPage from '../PhotoPage/PhotoPage';
import AcountPage from '../AccountPage/AcountPage';

const SettingDashBoard = () => {
	return (
		<Grid container xs>
			<Grid item xs={3}>
				<Grid item container direction='column' alignItems='center'>
					<Box width={200} mt={8} ml='auto' boxShadow={3} border={1}>
						<SettingNav />
					</Box>
				</Grid>
			</Grid>
			<Grid item xs={9}>
				<Grid item container direction='column'>
					<Switch>
						<Redirect exact from='/settings' to='/settings/basic' />
						<Route path='/settings/basic' component={BasicPage} />
						<Route path='/settings/about' component={AboutPage} />
						<Route path='/settings/photo' component={PhotoPage} />
						<Route path='/settings/account' component={AcountPage} />
					</Switch>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SettingDashBoard;
