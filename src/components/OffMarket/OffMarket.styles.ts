import styled from 'styled-components'

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px;
`

export const TopTitle = styled.div`
  position: absolute;
  top: 100px;
  & img {
    width: 10px;
    height: 10px;
  }
  & span {
    font-family: Roboto;
    font-size: 1rem;
    line-height: 19px;
    padding: 10px;
    color: #747474;
  }
  & :last-child {
    color: #000000;
  }
`
