import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  font-family: Roboto;
  letter-spacing: 0.04em;
`

export const Header = styled.p`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 2.25rem;
  color: #000000;
`

export const Text = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  & span {
    font-weight: 500;
    font-size: 1.125rem;
    border-bottom: 1.5px solid #000000;
  }
`
