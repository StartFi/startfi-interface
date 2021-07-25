import styled from 'styled-components'

const Text = styled('p')<{
  width?: string
  fontFamily?: string
  FontWeight?: string
  fontSize?: string
  margin?:string
  color?:string
  overflow?: string
  textOverflow?: string
  marginLeft?:string
  marginRight?:string
  spanWeight?: string
  textTransform?:string
}>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ FontWeight }) => FontWeight};
  font-size: ${({ fontSize }) => fontSize};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  overflow: ${({ overflow }) => overflow};
  text-overflow: ${({ textOverflow }) => textOverflow};
  margin:${({ margin }) => margin};
  text-transform:${({ textTransform }) => textTransform};



  & span{
    margin-left:${({ marginLeft }) => marginLeft};
    font-weight: ${({ spanWeight }) => spanWeight};
  }
`

export default Text;
