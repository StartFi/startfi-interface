import styled from 'styled-components'

export const Counter = styled.div`
  display: inline-block;
  & p {
    display: inline-block;
  }
  & :first-child {
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 1rem;
    color: #000000;
    margin-right: 2px;
  }
  & :last-child {
    margin-right: 5px;
  }
`
