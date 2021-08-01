import styled from 'styled-components'

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  & img {
    width: 101px;
    width:99px;
  }
`

export const Divider = styled('div') <{ width?: string; left?: string }>`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    height: 1px;
    width: ${({ width }) => width};
    left: ${({ left }) => left};
    background-color: #f0f0f0;
  }
`

export const TextContainer = styled('div') <{ marginLeft?: string; width?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ marginLeft }) => marginLeft};
  width: ${({ width }) => width};
`
export const TagRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  & span {
    margin-left: 7rem;
    font-weight: 500;
  }
`

export const DeListingContainer=styled('div')<{height?:string}>`
display:flex;
align-items:center;
justify-content:space-between;
height:${({ height }) => height};
margin:0px 18px 0px 30px;
`
