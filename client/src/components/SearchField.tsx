import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
	callback: (text: string) => void
}

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: '#f7f8f9',
		height: '100vh',
	},
	search: {
		marginTop: theme.spacing(1),
	},
	textField: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		[`& fieldset`]: {
			borderRadius: 10,
		},
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	searchButton: {
		fontSize: '1rem',
		padding: theme.spacing(1, 3),
		border: '1px solid #4A4A4A',
		width: theme.spacing(10),
		justify: 'right',
		margin: '0 auto',
		marginLeft: '1rem',
		borderRadius: 10,
		color: '#FFFFFF',
		backgroundColor: '#6441A5',
	},
}))

const SearchField: React.FC<Props> = ({ callback }) => {
	const [searchText, setSearchText] = useState<string>('')
	const classes = useStyles()

	return (
		<Grid container direction='row' justify='center'>
			<Box mb={1}>
				<Box py={5}>
					<Grid item xs={7}>
						<Box
							mt={1}
							mb={4}
							minWidth={700}
							display='flex'
							alignItems='center'
						>
							<TextField
								className={classes.textField}
								fullWidth
								variant='outlined'
								placeholder='Paste XML link to RSS feed here...'
								onChange={(e) => {
									setSearchText(e.target.value)
								}}
								onSubmit={(e) => callback(searchText)}
							/>
							<Button
								className={classes.searchButton}
								onClick={() => callback(searchText)}
							>
								Add
							</Button>
						</Box>
					</Grid>
				</Box>
			</Box>
		</Grid>
	)
}

export default SearchField
