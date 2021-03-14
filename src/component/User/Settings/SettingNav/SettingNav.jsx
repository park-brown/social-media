import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
const SettingNav = () => {
	return (
		<List component='nav' aria-label='profile'>
			<ListItem button>
				<ListItemText primary='profile' />
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
			</ListItem>
			<Divider />
			<ListItem button component={Link} to='/settings/basic'>
				<ListItemText primary='basic' />
			</ListItem>
			<Divider />
			<ListItem button component={Link} to='/settings/about'>
				<ListItemText primary='about me' />
			</ListItem>
			<Divider />
			<ListItem button component={Link} to='/settings/photo'>
				<ListItemText primary='my photos' />
			</ListItem>
			<Divider />
			<ListItem button component={Link} to='/settings/account'>
				<ListItemText primary='my account' />
			</ListItem>
		</List>
	);
};

export default SettingNav;
