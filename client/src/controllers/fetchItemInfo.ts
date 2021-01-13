export const fetchItemInfo = async (link: string) => {
	const endpoint = `/api/fetchItems?link=${link}`

	let data = await fetch(endpoint)
		.then((res) => res.json())
		.then((res) => {
			return res
		})
	return data
}
