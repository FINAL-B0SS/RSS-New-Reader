import FeedInfoCard from './components/Cards/FeedInfoCard'
import ItemInfoCard from './components/Cards/ItemInfoCard'
import { Feed, Item } from './types'

export const buildFeedInfoCards = (
	feeds: Feed[],
	callback: (link: string, title: string) => void,
	page: number
) => {
	return feeds
		.map((element) => (
			<FeedInfoCard key={element.link} feed={element} callback={callback} />
		))
		.slice(page, page + 5)
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
