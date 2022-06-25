import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function WordListModal() {
  const radios = [
    { name: 'Full', value: '1' },
    { name: 'Answers Only', value: '2' },
  ]

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Choose Wordlist</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default WordListModal
