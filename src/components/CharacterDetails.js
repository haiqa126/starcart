import { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const CharacterDetails = ({ details }) => {
	const [modalOpen, setModalOpen] = useState(false)
	if (details) {
		return (
			<Modal
				onOpen={() => setModalOpen(true)}
				onClose={() => setModalOpen(false)}
				open={modalOpen}
				trigger={<Button onClick={() => setModalOpen(true)}>view</Button>}
			>
				<Modal.Header>{details.name}</Modal.Header>
				<Modal.Content>
					<Modal.Description>Height: {details.height}</Modal.Description>
					<Modal.Description>Mass: {details.mass}</Modal.Description>
					<Modal.Description>Hair Color: {details.hair_color}</Modal.Description>
					<Modal.Description>Skin Color: {details.skin_color}</Modal.Description>
					<Modal.Description>Eye Color: {details.eye_color}</Modal.Description>
					<Modal.Description>Birth Year: {details.birth_year}</Modal.Description>
					<Modal.Description>Gender: {details.gender}</Modal.Description>
				</Modal.Content>
			</Modal>
		)
	}
	return null
}
export default CharacterDetails
