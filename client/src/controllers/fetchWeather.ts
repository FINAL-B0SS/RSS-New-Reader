import { Cords } from '../types'

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
