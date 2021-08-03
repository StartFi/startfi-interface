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
  display?:string
  textAlign?:string;
  textJustify?:string;
}>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ FontWeight }) => FontWeight};
  font-size: ${({ fontSize }) => fontSize};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  overflow: ${({ overflow }) => overflow};
  display: ${({ display}) => display};
  text-overflow: ${({ textOverflow }) => textOverflow};
  margin:${({ margin }) => margin};
  text-transform:${({ textTransform }) => textTransform};
  text-align: ${({ textAlign}) => textAlign};
  text-justify:${({ textJustify}) => textJustify};

  & span{
    margin-left:${({ marginLeft }) => marginLeft};
    font-weight: ${({ spanWeight }) => spanWeight};
  }
`

export default Text;
