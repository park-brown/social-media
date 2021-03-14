import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Grid } from '@material-ui/core';
import EventList from '../EventList/EventList';

const EventDashboard = () => {
	return (
		<React.Fragment>
			<CssBaseline />

			<Box component='main'>
				<Grid container>
					<Grid item md={8}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='center'
							mt={5}>
							<EventList />
						</Box>
					</Grid>
					<Grid item md={4}></Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
};

export default EventDashboard;
