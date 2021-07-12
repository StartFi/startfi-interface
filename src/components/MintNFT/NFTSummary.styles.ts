import styled from 'styled-components'
import { Row } from './../../theme'

export const Container = styled.div``

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #f7f7f7;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);
  border-radius: 8px 8px 0px 0px;
  padding: 2vh 2vw;
`

export const Field = styled(Row)`
  justify-content: flex-start;
  align-items: stretch;
`

export const Label = styled.div`
  width: 25%;
  color: #444444;
`

export const DataWidth = styled.div`
  width: 75%;
  text-align: left;
`

export const Data = styled(DataWidth)`
  font-weight: bold;
`

export const Data500 = styled(DataWidth)`
  font-weight: 500;
`

export const Tags = styled(Row)`
  justify-content: flex-start;
  width: 75%;
  flex-flow: row wrap;
`

export const Line = styled.hr`
  border: 1px solid #f0f0f0;
  width: 70%;
  margin: 2vh 0;
`

export const FirstField = styled(Field)`
  align-items: center;
`

export const FirstBoxFields = styled.div`
  width: 90%;
  padding-left: 2vw;
`

export const FirstBoxLabel = styled(Label)`
  width: 15vw;
`
export const FirstBoxData = styled(Data)`
  width: 100%;
`

export const Img = styled.img`
  width: 101px;
  height: 99px;
  border-radius: 4px;
`

// export const Footer = styled(Row)`
//   margin-top: 4vh;
//   justify-content: flex-end;
// `

export const Prepare = styled.div`
  margin: 2vh 0;
`

export const Name = styled.div`
  margin-bottom: 1vh;
`

export const Footer = styled(Row)`
  margin-top: 4vh;
  justify-content: unset;
`

export const Radio = styled(Row)`
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 60vw;
`

export const Buttons = styled(Row)`
  justify-content: flex-end;
`

export const RadioLabel = styled.div`
  margin-left: 1vw;
  letter-spacing: 0.04em;
  text-transform: capitalize;
`

export const Left = styled.div`
  flex-grow: 1;
`

export const Info = styled.div`
  line-height: 28px;
  letter-spacing: 0.04em;
`

export const Columns = styled(Row)`
  align-items: flex-start;
`
