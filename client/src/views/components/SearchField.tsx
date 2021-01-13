import React, { useState } from 'react'
import { Box, Grid, Button, TextField, makeStyles } from '@material-ui/core/'

type Props = {
	callback: (text: string) => void
}

const useStyles = makeStyles((theme) => ({
	textField: {
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		height: theme.spacing(7),
		[`& fieldset`]: {
			borderRadius: 10,
			border: '2px solid black',
		},
	},
	searchButton: {
		fontSize: '1rem',
		margin: '0 auto',
		justify: 'right',
		color: '#FFFFFF',
		marginLeft: '1rem',
		border: '2px solid black',
		backgroundColor: '#6441A5',
		width: theme.spacing(10),
		height: theme.spacing(7),
		padding: theme.spacing(1, 3),
		borderRadius: theme.spacing(1),
	},
	box: {
		width: theme.spacing(85),
		marginBottom: theme.spacing(1),
		display: 'flex',
		alignItems: 'center',
	},
}))

const SearchField: React.FC<Props> = ({ callback }) => {
	const [searchText, setSearchText] = useState<string>('')
	const classes = useStyles()

	return (
		<Grid container direction='row' justify='center'>
			<Box className={classes.box}>
				<TextField
					className={classes.textField}
					fullWidth
					variant='outlined'
					placeholder='Paste XML link to RSS feed here...'
					onChange={(e) => {
						setSearchText(e.target.value)
					}}
					onSubmit={() => callback(searchText)}
				/>
				<Button
					className={classes.searchButton}
					onClick={() => callback(searchText)}
				>
					Add
				</Button>
			</Box>
		</Grid>
	)
}

export default SearchField
