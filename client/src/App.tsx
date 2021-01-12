import './App.css'
import Header from './components/Header'
import SearchField from './components/SearchField'
import React, { useState, useEffect } from 'react'
import { fetchFeedInfo, fetchFeedItems } from './API'
import PageNavigation from './components/PageNavigation'
import { makeStyles, Box, Grid } from '@material-ui/core/'
import { Cords, Item, Feed } from './types'
import { buildFeedInfoCards, buildItemInfoCards } from './utils'
import Weather from './components/Weather'

const useStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
		width: theme.spacing(60),
		paddingBottom: theme.spacing(5),
	},
}))

const App: React.FC = () => {
	const [feeds, setFeeds] = useState<Feed[]>([])
	const [items, setItems] = useState<Item[]>([])
	const [title, setTitle] = useState<string>('My News Reader')
	const [page, setPage] = useState<number>(0)
	const [cords, setCords] = useState<Cords | null>(null)
	const classes = useStyles()

	const pageCount = Math.ceil(
		(items.length > 0 ? items.length : feeds.length) / 5
	)

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				setCords({
					lat: position.coords.latitude,
					long: position.coords.longitude,
				})
			})
		}
	}, [])

	const fetchFeed = async (link: string) => {
		const feed = await fetchFeedInfo(link, feeds)
		if (feed) {
			setFeeds((prev) => [...prev, feed])
		}
	}

	const fetchItems = async (link: string, title: string) => {
		const feedItems = await fetchFeedItems(link, feeds)
		if (Array.isArray(feedItems)) {
			setItems(feedItems)
			setTitle(title)
		}
	}

	const pageNavigation = (option: string) => {
		if (option === '.') {
			setPage(0)
			setItems([])
			setTitle('My News Reader')
		} else if (option === '+' && page + 1 < pageCount) {
			setPage((prev) => prev + 1)
		} else if (option === '-' && page !== 0) {
			setPage((prev) => prev - 1)
		}
	}

	return (
		<Box className='App'>
			<Grid container direction='column' alignItems='center'>
				<Box className={classes.header}>
					<Header title={title} />
					{cords && <Weather cords={cords} />}
				</Box>
				{items.length === 0 ? (
					<>
						<SearchField callback={fetchFeed} />{' '}
						{buildFeedInfoCards(feeds, fetchItems, page)}
					</>
				) : (
					buildItemInfoCards(items, page)
				)}
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
