import React from 'react'
import { Feed } from '../API'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'

type Props = {
	feed: Feed
	callback: (text: string) => void
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

const FeedInfoCard: React.FC<Props> = ({ feed, callback }) => {
	const classes = useStyles()

	return (
		<Grid container direction='row' justify='center'>
			<Card className={classes.root} onClick={() => callback(feed.link)}>
				<CardContent>
					{feed.image && <img src={feed.image} alt={feed.title}></img>}
					<Typography variant='h5' component='h5'>
						{feed.title}
					</Typography>
					<Typography variant='body2' component='p'>
						<br />
						{feed.description}
					</Typography>
					{feed.lastBuildDate && (
						<Typography className={classes.pos} color='textSecondary'>
							<br />
							{`Last Updated: ${feed.lastBuildDate}`}
						</Typography>
					)}
				</CardContent>
			</Card>
		</Grid>
	)
}

export default FeedInfoCard
