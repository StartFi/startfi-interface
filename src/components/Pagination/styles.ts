import styled from 'styled-components'
import { Row } from 'theme'

export const Container = styled(Row)`
  width: 100%;
  max-width: 20vw;
  margin: 0 auto;
`

export const Number = styled.div<{ active: boolean }>`
  font-size: 14px;
  line-height: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
  color: ${({ active }) => (active ? '#fff' : '#222')};
  background-color: ${({ active }) => (active ? '#000000' : 'white')};
  border-radius: ${({ active }) => (active ? '100%' : '0')};
`
