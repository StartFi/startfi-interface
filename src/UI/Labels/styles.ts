import styled from 'styled-components'
import { Row, SpaceBetween } from 'theme'

export const Container = styled(Row)`
  justify-content: flex-start;
  width: fit-content;
`

interface LabelContainerProps {
  readonly error?: boolean
  readonly underline?: boolean
}

export const LabelContainer = styled.div<LabelContainerProps>`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  padding-bottom: 2vh;
  border-bottom: ${props => (props.underline ? '1px solid' : 'none')} ${props => (props.error ? '#FF0000' : '#dddddd')};
`
export const MarginLeft = styled.div`
  margin-right: 2vw;
`

export const Missed = styled.div`
  font-size: 0.875rem;
  color: #ff0000;
`

export const LabelBlack = styled.div`
  margin-right: 1vw;
  color: black;
`

export const LabelGrey = styled.div`
  margin-right: 1vw;
  color: #7e7e7e;
`
