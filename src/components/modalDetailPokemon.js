import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalDetailPokemon = (props) => {
  //   console.log(props.data.name);
  const { name, weight } = props.data;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal Detail Pokemon
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Details Info</h4>
        <p>Pokemon name: {name}</p>
        <p>Weight: {weight}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
