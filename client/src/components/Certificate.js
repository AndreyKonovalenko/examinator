import { CertificateStyled } from './styles/Certificate.styled'
import { StyledModalContent } from './styles/Modal.styled'

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// }

export default function Certificate({}) {
  // const { question, answers } = props.item;
  return (
    <StyledModalContent>
      <CertificateStyled>
        <h1>Test Modal</h1>
      </CertificateStyled>
    </StyledModalContent>
  )
}
