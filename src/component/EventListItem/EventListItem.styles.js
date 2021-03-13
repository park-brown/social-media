import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		width: 600,
		height: 240,

		marginBottom: theme.spacing(1),
	},
	title: {
		textDecoration: 'none',
		color: 'black',
		...theme.typography.body1,
	},
	subheader: {
		textDecoration: 'none',
		color: 'black',
		...theme.typography.caption,
	},

	description: {
		height: 125,

		background: `${theme.palette.grey[300]}`,
		'& > *': {
			marginLeft: theme.spacing(1),
		},
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	CardActions: {
		justifyContent: 'space-between',
		height: 40,
	},
	CardContent: {
		padding: 0,
		paddingBottom: 0,
	},
	button: {
		textTransform: 'none',
		background: '#69f0ae',
		color: 'white',
		'&:hover': {
			background: '#49a879',
		},
	},
	favorite: {
		'&:hover': {
			color: `${theme.palette.secondary.main}`,
		},
	},
}));
