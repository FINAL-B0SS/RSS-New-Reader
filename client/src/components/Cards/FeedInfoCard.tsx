import React from 'react'
import { Feed } from '../../utils'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'

type Props = {
	feed: Feed
	callback: (link: string, title: string) => void
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

const FeedInfoCard: React.FC<Props> = ({ feed, callback }) => {
	const classes = useStyles()

	return (
		<Grid container direction='row' justify='center'>
			<Card
				className={classes.root}
				onClick={() => callback(feed.link, feed.title)}
			>
				<CardContent>
					{feed.image && <img src={feed.image} alt={feed.title}></img>}
					<Typography className={classes.title}>{feed.title}</Typography>
					{feed.description && (
						<Typography variant='body2' component='p'>
							<br />
							{feed.description}
						</Typography>
					)}
					{feed.lastBuildDate && (
						<Typography color='textSecondary'>
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
