import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PeopleIcon from '@material-ui/icons/People';
import { useStyles } from './NavBar.styles';
import { Box, Grid } from '@material-ui/core';
const NavBar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.appbar}>
				<Toolbar>
					<Grid container justify='space-between'>
						<Box className={classes.leftBox} display='flex'>
							<Button className={classes.button} startIcon={<PeopleIcon />}>
								Re-vents
							</Button>

							<Button className={classes.button}>Events</Button>

							<Button variant='outlined' className={classes.postButton}>
								create new post
							</Button>
						</Box>
						<Box className={classes.login}>
							<Button color='inherit' variant='outlined'>
								Login
							</Button>
							<Button color='inherit' variant='outlined'>
								sign out
							</Button>
						</Box>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
