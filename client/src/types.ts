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
	content: string
}

export type Cords = {
	lat: number
	long: number
}

export type WeatherInfo = {
	name: string
	desc: string
	temp: string
	icon: string
}

export type Icons = {
	[index: string]: string
	Thunderstorm: string
	Drizzle: string
	Rain: string
	Snow: string
	Atmosphere: string
	Clear: string
	Clouds: string
}

export enum Navigation {
	HOME = '.',
	NEXT_PAGE = '+',
	PREV_PAGE = '-',
}
