import { Overlay, MContainer, MIcon } from '../styles/Modal.styled';
import { MdClose } from 'react-icons/md';
const Modal = (props) => {
  const { onClose } = props;
  return (
    <Overlay>
      <MContainer>
        <MIcon onClick={() => onClose()}>
          <MdClose size={'1.5rem'} />
        </MIcon>
        <h1>MODAL WINDOW</h1>
      </MContainer>
    </Overlay>
  );
};

export default Modal;
