import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	container: {
		width: '100vw',
		height: '100vh',
		background: 'linear-gradient(45deg, #1c44b2 30%, #35afea 90%)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		width: 40,
		height: 40,
	},
	image: {
		width: '100%',
		height: '100%',
		display: 'block',
	},
	hello: {
		display: 'flex',
		alignItems: 'center',
		'& > *': {
			marginRight: theme.spacing(1),
			marginBottom: theme.spacing(3),
		},
	},
	text: {
		color: theme.palette.common.white,
	},
	button: {
		color: theme.palette.common.white,
		textTransform: 'none',
		border: '1px solid white',
	},
}));
