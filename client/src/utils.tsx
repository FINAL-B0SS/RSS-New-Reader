import FeedInfoCard from './components/Cards/FeedInfoCard'
import ItemInfoCard from './components/Cards/ItemInfoCard'

export type Feed = {
	title: string
	link: string
	description: string
	lastBuildDate: string
	image?: string
}

export type Item = {
	title: string
	description: string
	image: string
	link: string
	pubDate: string
	'content:encoded': string
}

export type Cords = {
	lat: number
	long: number
}

export const buildFeedInfoCards = (
	feeds: Feed[],
	callback: (link: string, title: string) => void,
	page: number
) => {
	return feeds.map((element) => (
		<FeedInfoCard key={element.link} feed={element} callback={callback} />
	))
}
export const buildItemInfoCards = (items: Item[], page: number) => {
	return items
		.map((element: Item) => <ItemInfoCard key={element.link} item={element} />)
		.slice(page, page + 5)
}

export const removeTags = (str: string) => {
	if (str === null || str === '') return false
	else str = str.toString()
	return str.replace(/(<([^>]+)>)/gi, '')
}
