import { createSlice, nanoid } from '@reduxjs/toolkit'

const createItem = item => ({
	id: nanoid(),
	...item,
})
const initialState = {
	items: [],
	total: 0,
	prices: {
		people: 10,
		starships: 20,
		vehicles: 5.5,
		planets: 100,
		films: 12.99,
	},
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducer: {
		addItem: (state, action) => {
			const item = createItem(action.payload)
			state.items.push(item)
			state.total += state.prices[item.type]
		},
		removeItem: (state, action) => {
			const itemId = action.payload
			const itemIndex = state.items.findIndex(item => item.id === itemId)
			if (itemIndex >= 0) {
				const item = state.items[itemIndex]
				state.items.splice(itemIndex, 1)
				state.total -= state.prices[item.type]
			}
		},
		editItem: (state, action) => {
			const itemId = action.payload.id
			const itemIndex = state.items.findIndex(item => item.id === itemId)
			if (itemIndex >= 0) {
				const oldItem = state.items[itemIndex]
				const newItem = { ...oldItem, ...action.payload }
				state.items[itemIndex] = newItem
				state.total += state.prices[newItem.type] - state.prices[oldItem.type]
			}
		},
	},
})

export const { addItem, removeItem, editItem } = cartSlice.actions
