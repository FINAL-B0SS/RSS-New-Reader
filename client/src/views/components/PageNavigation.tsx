import React from 'react'
import { Navigation } from '../../types'
import { Box, Grid, Button, makeStyles } from '@material-ui/core/'

type Props = {
	callback: (option: string) => void
	page: number
	pageCount: number
	isHome: boolean
}

const useStyles = makeStyles((theme) => ({
	button: {
		fontSize: '1rem',
		justify: 'right',
		color: '#FFFFFF',
		marginLeft: '1rem',
		border: '2px solid black',
		backgroundColor: '#6441A5',
		width: theme.spacing(10),
		height: theme.spacing(5),
		borderRadius: theme.spacing(1),
	},
	box: {
		width: theme.spacing(85),
		marginBottom: theme.spacing(1),
		display: 'flex',
		justifyContent: 'flex-end',
	},
	pageCounter: {
		fontWeight: 'bold',
		fontFamily: 'Monospace',
		fontSize: theme.spacing(2),
		marginRight: theme.spacing(11),
	},
}))

const PageNavigation: React.FC<Props> = ({
	callback,
	page,
	pageCount,
	isHome,
}) => {
	const classes = useStyles()

	return (
		<Grid>
			<Grid container justify='flex-end'>
				<Grid container direction='row' justify='center'>
					<Box className={classes.box}>
						{!isHome && (
							<Button
								onClick={() => callback(Navigation.HOME)}
								className={classes.button}
							>
								Home
							</Button>
						)}
						{pageCount > 1 && (
							<>
								<Button
									onClick={() => callback(Navigation.PREV_PAGE)}
									className={classes.button}
								>
									Prev
								</Button>
								<Button
									onClick={() => callback(Navigation.NEXT_PAGE)}
									className={classes.button}
								>
									Next
								</Button>
							</>
						)}
					</Box>
				</Grid>
				{pageCount > 1 && (
					<span className={classes.pageCounter}>
						Page: {page + 1} / {pageCount}
					</span>
				)}
			</Grid>
		</Grid>
	)
}

export default PageNavigation
