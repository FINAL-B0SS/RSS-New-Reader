import '../App.css'
import { Navigation } from '../types'
import Header from './components/Header'
import Weather from './components/Weather'
import { Cords, Item, Feed } from '../types'
import SearchField from './components/SearchField'
import React, { useState, useEffect } from 'react'
import PageNavigation from './components/PageNavigation'
import { makeStyles, Box, Grid } from '@material-ui/core/'
import { fetchItemInfo } from '../controllers/fetchItemInfo'
import { fetchFeedInfo } from '../controllers/fetchFeedInfo'
import { buildFeedInfoCards } from '../models/buildFeedInfoCards'
import { buildItemInfoCards } from '../models/buildItemInfoCards'

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
		const feedItems = await fetchItemInfo(link)
		if (Array.isArray(feedItems)) {
			setItems(feedItems)
			setTitle(title)
		}
	}

	const reset = () => {
		setPage(0)
		setItems([])
		setTitle('My News Reader')
	}

	const pageNavigation = (option: string) => {
		if (option === '.') {
			reset()
		} else if (option === Navigation.NEXT_PAGE && page + 1 < pageCount) {
			setPage((prev) => prev + 1)
		} else if (option === Navigation.PREV_PAGE && page !== 0) {
			setPage((prev) => prev - 1)
		}
	}

	return (
		<Box>
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
