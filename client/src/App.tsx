import React, { useState } from 'react'
import './App.css'
import SearchField from './components/SearchField'
import { fetchFeedInfo } from './API'

interface Feed {
	title: string
	link: string
	description: string
	lastBuildDate: string
	image: string
}

function App() {
	const [feeds, setFeeds] = useState<Feed[]>([])

	const fetchFeed = async (link: string) => {
		const feed = await fetchFeedInfo(link, feeds)

		if (feed) {
			setFeeds((prev) => [...prev, feed])
		}
	}

	return (
		<div className='App'>
			<SearchField callback={fetchFeed} />
		</div>
	)
}

export default App
