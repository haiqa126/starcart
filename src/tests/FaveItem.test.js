import { render, fireEvent } from '@testing-library/react'
import FaveItem from '../components/Faves/FaveItem'
import '@testing-library/jest-dom/extend-expect'

const mockFave = {
	id: 2,
	name: 'Test Item',
	rating: '5',
}

test('renders component with correct input', () => {
	const handleRating = jest.fn()
	const handleRemove = jest.fn()
	const { getByText, getByAltText, getByTestId } = render(
		<FaveItem fave={mockFave} handleRating={handleRating} handleRemove={handleRemove} />
	)

	expect(getByText(mockFave.name)).toBeInTheDocument()

	fireEvent.click(getByTestId('remove-button'))
	expect(handleRemove).toHaveBeenCalled()
})
