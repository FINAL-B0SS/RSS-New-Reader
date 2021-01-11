import './App.css'
import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SearchField from './components/SearchField'
import FeedInfoCard from './components/FeedInfoCard'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Item, Feed, fetchFeedInfo, fetchFeedItems } from './API'
import ItemInfoCard from './components/ItemInfoCard'

const useStyles = makeStyles((theme) => ({
	title: {
		color: '#6441A5',
		fontWeight: 'bold',
		paddingTop: theme.spacing(10),
		fontSize: theme.spacing(10),
	},
}))

const App: React.FC = () => {
	const [feeds, setFeeds] = useState<Feed[]>([])
	const [items, setItems] = useState<Item[]>([])

	const classes = useStyles()

	const fetchFeed = async (link: string) => {
		const feed = await fetchFeedInfo(link, feeds)
		if (feed) {
			setFeeds((prev) => [...prev, feed])
		}
	}

	const fetchItems = async (link: string) => {
		const feedItems = await fetchFeedItems(link, feeds)
		if (Array.isArray(feedItems)) {
			setItems(feedItems)
		}
	}

	const feedInfoCards = feeds.map((element) => (
		<FeedInfoCard key={element.link} feed={element} callback={fetchItems} />
	))

	const ItemInfoCards = items.map((element) => (
		<ItemInfoCard key={element.link} item={element} />
	))

	return (
		<Box className='App'>
			<Grid container direction='column' alignItems='center'>
				<Typography className={classes.title}>My News Reader</Typography>
				<SearchField callback={fetchFeed} />
				{feeds.length > 0 && items.length === 0 && feedInfoCards}
				{items.length > 0 && ItemInfoCards}
			</Grid>
		</Box>
	)
}

export default App
