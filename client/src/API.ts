import { Feed, Cords } from './utils'

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

export const fetchWeather = async (cords: Cords) => {
	const api_key = 'eeacfe5f48da586c22f4f91fcfa47c74'
	const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${cords.lat}&lon=${cords.long}&appid=${api_key}`

	let data = await fetch(endpoint)
		.then((res) => res.json())
		.then((res) => {
			return res
		})
	return data
}
