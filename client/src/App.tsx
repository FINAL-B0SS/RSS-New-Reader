import './App.css'
import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SearchField from './components/SearchField'
import FeedInfoCard from './components/FeedInfoCard'
import ItemInfoCard from './components/ItemInfoCard'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PageNavigation from './components/PageNavigation'
import { Item, Feed, fetchFeedInfo, fetchFeedItems } from './API'

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
	const [page, setPage] = useState<number>(0)

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

	let pageCount = Math.ceil(
		(items.length > 0 ? items.length : feeds.length) / 5
	)

	const pageNavigation = (option: string) => {
		if (option === '.') {
			setPage(0)
			setItems([])
		} else if (option === '+' && page + 1 < pageCount) {
			setPage((prev) => prev + 1)
		} else if (option === '-' && page !== 0) {
			setPage((prev) => prev - 1)
		}
	}

	const feedInfoCards = feeds.map((element) => (
		<FeedInfoCard key={element.link} feed={element} callback={fetchItems} />
	))

	const ItemInfoCards = items
		.slice(page, page + 5)
		.map((element) => <ItemInfoCard key={element.link} item={element} />)

	return (
		<Box className='App'>
			<Grid container direction='column' alignItems='center'>
				<Typography className={classes.title}>My News Reader</Typography>
				{items.length === 0 && <SearchField callback={fetchFeed} />}
				{feeds.length > 0 && items.length === 0 && feedInfoCards}
				{items.length > 0 && ItemInfoCards}
				<PageNavigation
					callback={pageNavigation}
					page={page}
					pageCount={pageCount}
					isHome={items.length === 0}
				/>
			</Grid>
		</Box>
	)
}

export default App
