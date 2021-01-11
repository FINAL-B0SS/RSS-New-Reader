import React from 'react'
import { Item } from '../API'
import { removeTags } from '../utils'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'

type Props = {
	item: Item
}

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 500,
		maxWidth: 500,
		margin: theme.spacing(1),
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}))

const ItemInfoCard: React.FC<Props> = ({ item }) => {
	const classes = useStyles()

	return (
		<Grid container direction='row' justify='center'>
			<Card className={classes.root}>
				<CardContent>
					<Typography variant='h5' component='h5'>
						{item.title}
					</Typography>
					<Typography variant='body2' component='p'>
						<br />
						{removeTags(item.description)}
					</Typography>
					{item.pubDate && (
						<Typography className={classes.pos} color='textSecondary'>
							<br />
							{`Last Updated: ${item.pubDate}`}
						</Typography>
					)}
				</CardContent>
			</Card>
		</Grid>
	)
}

export default ItemInfoCard
