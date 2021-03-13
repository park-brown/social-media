import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from '@material-ui/core';
import { useStyles } from './EventListItem.styles';
const EventListItem = () => {
	const classes = useStyles();
	return (
		<Card className={classes.root} variant='outlined'>
			<CardHeader
				avatar={
					<Avatar
						aria-label='image'
						src='https://randomuser.me/api/portraits/women/42.jpg'></Avatar>
				}
				action={
					<IconButton aria-label='image'>
						<MoreVertIcon />
					</IconButton>
				}
				title={<Link className={classes.title}> name</Link>}
				subheader={<Link className={classes.subheader}> times ago</Link>}
			/>
			<div className={classes.description}>
				<CardContent className={classes.CardContent}>
					<Typography variant='body2'>description go here</Typography>
				</CardContent>
			</div>

			<CardActions className={classes.CardActions}>
				<IconButton className={classes.favorite}>
					<FavoriteIcon />
				</IconButton>
				<IconButton>
					<CommentIcon />
				</IconButton>
				<Button size='small' className={classes.button}>
					view
				</Button>
			</CardActions>
		</Card>
	);
};

export default EventListItem;
