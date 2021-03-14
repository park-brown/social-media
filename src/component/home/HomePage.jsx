import React from 'react';
import Grid from '@material-ui/core/Grid';
import logo from './logo.png';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useStyles } from './HomePage.styles';
import { Box, Button, Typography } from '@material-ui/core';
const HomePage = ({ history }) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.container}>
			<Box display='flex' flexDirection='column'>
				<div className={classes.hello}>
					<div className={classes.imageContainer}>
						<img className={classes.image} src={logo} alt='logo'></img>
					</div>

					<Typography variant='h3' className={classes.text}>
						welcome
					</Typography>
				</div>
				<Button
					variant='outlined'
					onClick={() => {
						history.push('/events');
					}}
					className={classes.button}
					endIcon={<ArrowRightAltIcon />}>
					Get Started
				</Button>
			</Box>
		</Grid>
	);
};

export default HomePage;
