import React from 'react'
import { Item } from '../../API'
import { removeTags } from '../../utils'
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

const ItemInfoCard: React.FC<Props> = ({ item }) => {
	const classes = useStyles()

	return (
		<Grid container direction='row' justify='center'>
			<Card className={classes.root}>
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
		</Grid>
	)
}

export default ItemInfoCard
