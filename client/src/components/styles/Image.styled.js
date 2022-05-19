import styled from 'styled-components'

const random = Math.floor(Math.random() * 180)

export const StyledImage = styled.img`
  width: 30px;
  hight: 30px;
  opacity: 0.07;
  border-radius: 50%;
  transform: rotate(${random}deg);
  z-index: -1;
`
