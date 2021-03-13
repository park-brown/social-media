import React from 'react';
import NavBar from '../../component/NavBar/NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Grid } from '@material-ui/core';
import EventList from '../../component/EventList/EventList';
const HomePage = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<NavBar />
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
					<Grid item md={4}>
						Right column
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
};

export default HomePage;
