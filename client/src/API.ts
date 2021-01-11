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

export const fetchFeedInfo = async (link: string, feeds: Feed[]) => {
	if (!feeds.find((element) => element.link === link)) {
		const endpoint = `http://localhost:8080/api/fetchFeed?link=${link}`

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

export const fetchFeedItems = async (link: string, feeds: Feed[]) => {
	const endpoint = `http://localhost:8080/api/fetchItems?link=${link}`

	let data = await fetch(endpoint)
		.then((res) => res.json())
		.then((res) => {
			return res
		})
	return data
}
