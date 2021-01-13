import { Item } from '../types'
import ItemInfoCard from '../views/components/cards/ItemInfoCard'

export const buildItemInfoCards = (items: Item[], page: number) => {
	return items
		.map((element: Item) => <ItemInfoCard key={element.link} item={element} />)
		.slice(page, page + 5)
}
