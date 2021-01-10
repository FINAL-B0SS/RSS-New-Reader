const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const parseString = require('xml2js').parseString

interface Item {
	title: string
	description: string
	image: string
	link: string
	pubDate: string
	'content:encoded': string
}

interface FeedInfo {
	title: string
	link: string
	description: string
	lastBuildDate: string
	image: string
	item?: Item[]
}

const httpGet = (theUrl: string) => {
	let req = new XMLHttpRequest()
	let ret: any

	req.open('GET', theUrl, false)
	req.send(null)

	parseString(req.responseText, function (err: object, result: any) {
		ret = result
	})
	return ret
}

// Parse xml for object containing feed information
const fetchFeed = (link: string) => {
	const data = httpGet(link)
	let feed

	if (data.feed) {
		feed = data.feed
	} else if (data.rss.channel[0]) {
		feed = data.rss.channel
	}

	if (Array.isArray(feed)) {
		feed = feed[0]
	}

	return feed
}

// Extract basic info about rss feed (title, source, description, image, and last update)
export const fetchFeedInfo = (link: string): FeedInfo | null => {
	const feed = fetchFeed(link)
	let image

	if (feed) {
		if (feed.icon) {
			image = feed.icon[0]
		} else if (feed.image) {
			image = feed.image[0].url[0]
		}

		const feedInfo = {
			title: feed.title[0],
			link: link,
			description: feed.description ? feed.description[0] : null,
			lastBuildDate: feed.lastBuildDate ? feed.lastBuildDate[0] : null,
			image: image,
		}

		return feedInfo
	}
	return null
}

const parseItems = (feed: FeedInfo) => {
	if (feed.item) {
		return feed.item
	}
	return null
}

// Fetch each item from given rss feed link
export const fetchItems = (link: string) => {
	const feed = fetchFeed(link)
	const feedItems = parseItems(feed)

	if (feedItems) {
		const items = feedItems.map((item) => {
			return {
				title: item.title[0],
				description: item.description[0],
				image: null,
				link: Array.isArray(item.link) ? item.link[0] : item.link,
				pubDate: item.pubDate[0],
				'content:encoded': item['content:encoded']
					? item['content:encoded'][0]
					: null,
			}
		})

		return items
	}

	return null
}
