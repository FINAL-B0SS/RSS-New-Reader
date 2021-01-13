import { Feed } from '../types'

export const fetchFeedInfo = async (link: string, feeds: Feed[]) => {
	if (!feeds.find((element) => element.link === link)) {
		const endpoint = `/api/fetchFeed?link=${link}`

		let data = await fetch(endpoint)
			.then((res) => res.json())
			.then((res) => {
				return res
			})
		if (!data.error) {
			return data
		} else {
			console.error('The provided link is not a valid rss feed!')
		}
	} else {
		console.error('Feed already added!')
	}
}
