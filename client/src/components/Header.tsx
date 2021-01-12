import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core/'

type Props = {
	title: string
}

const useStyles = makeStyles((theme) => ({
	box: {
		width: theme.spacing(85),
		height: theme.spacing(22),
		marginBottom: theme.spacing(1),
		display: 'flex',
		alignItems: 'start',
	},
	title: {
		color: '#6441A5',
		fontWeight: 'bold',
		paddingTop: theme.spacing(10),
		fontSize: theme.spacing(5),
	},
	date: {
		fontWeight: 'bold',
		fontSize: theme.spacing(3),
	},
}))

const Header: React.FC<Props> = ({ title }) => {
	const classes = useStyles()
	const [dateTime, setDateTime] = useState<string>('')

	useEffect(() => {
		var timerID = setInterval(() => tick(), 1000)
		return function cleanup() {
			clearInterval(timerID)
		}
	})

	const tick = () => {
		const date = new Date()
		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()
		const time = date.toLocaleTimeString()

		setDateTime(`${day}/${month}/${year} | ${time}`)
	}

	return (
		<Grid container direction='row' justify='center'>
			<Box className={classes.box} flexDirection='row'>
				<Box className={classes.box} flexDirection='column'>
					<Typography className={classes.title}>{title}</Typography>
					<Typography className={classes.date}>{dateTime}</Typography>
				</Box>
			</Box>
		</Grid>
	)
}

export default Header
