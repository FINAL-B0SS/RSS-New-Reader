import React, { useState } from 'react'
import { Item } from '../../../types'
import ItemDialog from '../ItemDialog'
import {
	Grid,
	Card,
	Typography,
	CardContent,
	makeStyles,
} from '@material-ui/core/'

type Props = {
	item: Item
}

const useStyles = makeStyles((theme) => ({
	root: {
		border: '2px solid black',
		width: theme.spacing(85),
		margin: theme.spacing(1),
		borderRadius: theme.spacing(5),
	},
	title: {
		fontSize: theme.spacing(3),
		fontWeight: 'bold',
	},
}))

const removeTags = (str: string) => {
	if (str === null || str === '') return false
	else str = str.toString()
	return str.replace(/(<([^>]+)>)/gi, '')
}

const ItemInfoCard: React.FC<Props> = ({ item }) => {
	const classes = useStyles()
	let [dialogToggle, setDialogToggle] = useState<boolean>(false)

	const handleClose = () => {
		setDialogToggle(false)
	}

	return (
		<Grid container direction='row' justify='center'>
			<Card className={classes.root} onClick={() => setDialogToggle(true)}>
				<CardContent>
					<Typography className={classes.title}>{item.title}</Typography>
					<Typography variant='body2' component='p'>
						{removeTags(item.description)}
					</Typography>
					{item.pubDate && (
						<Typography color='textSecondary'>
							<br />
							{`Last Updated: ${item.pubDate}`}
						</Typography>
					)}
				</CardContent>
			</Card>
			<ItemDialog
				dialogToggle={dialogToggle}
				callback={handleClose}
				item={item}
			/>
		</Grid>
	)
}

export default ItemInfoCard
