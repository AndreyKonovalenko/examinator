import { CertificateStyled } from './styles/Certificate.styled'

export default function Certificate({ idTag }) {
  return (
    <CertificateStyled id={idTag}>
      <h1>Test Modal</h1>
    </CertificateStyled>
  )
}
