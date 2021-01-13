import { Feed } from '../types'
import FeedInfoCard from '../views/components/cards/FeedInfoCard'

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
