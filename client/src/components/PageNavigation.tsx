import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
	callback: (option: string) => void
	page: number
	pageCount: number
	isHome: boolean
}

const useStyles = makeStyles((theme) => ({
	searchButton: {
		fontSize: '1rem',
		justify: 'right',
		color: '#FFFFFF',
		marginLeft: '1rem',
		border: '2px solid black',
		backgroundColor: '#6441A5',
		width: theme.spacing(10),
		height: theme.spacing(7),
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
								onClick={() => callback('.')}
								className={classes.searchButton}
							>
								Home
							</Button>
						)}
						{pageCount > 1 && (
							<div>
								<Button
									onClick={() => callback('-')}
									className={classes.searchButton}
								>
									Prev
								</Button>
								<Button
									onClick={() => callback('+')}
									className={classes.searchButton}
								>
									Next
								</Button>
							</div>
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
