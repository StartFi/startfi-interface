import styled from 'styled-components'
import { Row } from 'theme'

export const Title = styled.div`
  color: #7e7e7e;
`

export const Count = styled.div`
  font-size: 12px;
  color: #444444;
`

export const Outline = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 2vh;
  min-height: 15vh;
  height: fit-content;
  padding: 1vh 1vw 2vh 1vw;
`

export const Tag = styled(Row)`
  background: #f4f4f4;
  border-radius: 4px;
  color: #0b0b0b;
  padding: 1vh 1vw;
  margin-right: 0.6vw;
  margin-top: 1vh;
  max-width: fit-content;
`

export const Img = styled.img`
  background-color: white;
  padding: 0.5vh 0.5vw;
  margin-left: 1vw;
`

export const Input = styled.input`
  margin-top: 1vh;
  height: 4vh;
  border: none;
  outline: none;
  ::placeholder {
    font-size: 14px;
    color: #444444;
  }
`
