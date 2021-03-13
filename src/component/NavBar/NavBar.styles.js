import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appbar: {
		background: 'linear-gradient(45deg, #1c44b2 30%, #35afea 90%)',
	},
	button: {
		color: 'white',
		textTransform: 'none',
		marginRight: theme.spacing(2),
	},
	postButton: {
		color: 'white',
		background: '#00e676',
		border: '2px solid white',
		textTransform: 'none',
		marginLeft: theme.spacing(2),
		'&:hover': {
			background: '#00e676',
		},
	},
	login: {
		'& > *': {
			marginRight: theme.spacing(2),
			textTransform: 'none',
		},
	},
	leftBox: {
		marginLeft: theme.spacing(12),
	},
	divider: {
		color: 'white',
	},
}));
