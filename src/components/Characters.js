import { Button, Card, Loader, Message, Pagination } from 'semantic-ui-react'
import { useGetCharactersQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import CharacterDetails from './CharacterDetails'
import { useState } from 'react'

const PAGE_SIZE = 10

const Characters = () => {
	const [activePage, setActivePage] = useState(1)
	const { data, isError, isLoading } = useGetCharactersQuery(activePage)

	const dispatch = useDispatch()

	const selectCharacter = e => {
		const { title } = e.currentTarget.dataset
		const character = data.results.find(character => character.name === title)
		return character
	}
	const addToFavourites = e => dispatch(addFave(selectCharacter(e)))

	const handlePaginationOnChange = (e, { activePage }) => {
		setActivePage(activePage)
	}

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data.results && Boolean(data?.results.length)) {
		return (
			<div>
				<Card.Group centered>
					{data.results.map(character => (
						<Card key={nanoid()}>
							<Card.Content>
								<Card.Header>{character.name}</Card.Header>
								{character && character.films && <Card.Meta> films : {character.films.length}</Card.Meta>}
								<Card.Description>Height: {character.height}</Card.Description>
								<Card.Description>Gender: {character.gender}</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<CharacterDetails details={character} />
								<Button
									icon={{ name: 'plus', size: 'small' }}
									data-title={character.name}
									positive
									content="Add to faves"
									onClick={addToFavourites}
								/>
							</Card.Content>
						</Card>
					))}
				</Card.Group>
				<Pagination
					activePage={activePage}
					totalPages={Math.ceil(data.count / PAGE_SIZE)}
					onPageChange={handlePaginationOnChange}
				/>
			</div>
		)
	} else if (data?.results?.length === 0) {
		return <Message warning>no characters found</Message>
	}
	return null
}
export default Characters
