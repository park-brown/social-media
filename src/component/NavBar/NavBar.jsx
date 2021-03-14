import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './NavBar.styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '@material-ui/core/Avatar';
import { Box, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
const NavBar = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [authenticate, setAuthenticated] = React.useState(true);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const sign_out_menu = (
		<Box className={classes.login}>
			<Button color='inherit' variant='outlined'>
				Login
			</Button>
			<Button color='inherit' variant='outlined'>
				register
			</Button>
		</Box>
	);

	const sign_in_menu = (
		<React.Fragment>
			<Button
				className={classes.login}
				startIcon={<Avatar />}
				endIcon={<KeyboardArrowDownIcon />}
				aria-controls='sign-in-menu'
				aria-haspopup='true'
				onClick={handleClick}>
				Username
			</Button>
			<Menu
				id='sign-in-menu'
				anchorEl={anchorEl}
				keepMounted
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<Typography>create event</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<CalendarTodayIcon />
					</ListItemIcon>
					<Typography>my event</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<Typography>my network</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<AccountBoxIcon />
					</ListItemIcon>
					<Typography>my profile</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose} component={Link} to='/settings'>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<Typography>Settings</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<Typography>sign out</Typography>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);

	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.appbar}>
				<Toolbar>
					<Grid container justify='space-between'>
						<Box className={classes.leftBox} display='flex'>
							<Button
								startIcon={<HomeIcon />}
								className={classes.button}
								component={Link}
								to='/'>
								Home
							</Button>

							<Button
								startIcon={<EventIcon />}
								component={Link}
								to='/events'
								className={classes.button}>
								Events
							</Button>
							<Button
								component={Link}
								to='/people'
								className={classes.button}
								startIcon={<PeopleIcon />}>
								people
							</Button>

							<Button
								component={Link}
								to='/createEvent'
								variant='outlined'
								className={classes.postButton}>
								create new post
							</Button>
						</Box>
						{authenticate ? sign_in_menu : sign_out_menu}
						{/* <Box className={classes.login}>
							<Button color='inherit' variant='outlined'>
								Login
							</Button>
							<Button color='inherit' variant='outlined'>
								register
							</Button>
						</Box> */}
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
