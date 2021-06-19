import styled from 'styled-components'

const Text = styled('p')<{
  width?: string
  fontFamily?: string
  FontWight?: string
  fontSize?: string
  margin?:string
  color?:string
  overflow?: string
  textOverflow?: string
}>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ FontWight }) => FontWight};
  font-size: ${({ fontSize }) => fontSize};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  overflow: ${({ overflow }) => overflow};
  text-overflow: ${({ textOverflow }) => textOverflow};
  margin:${({ margin }) => margin};
`

export default Text;
