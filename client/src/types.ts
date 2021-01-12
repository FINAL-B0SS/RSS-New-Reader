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
