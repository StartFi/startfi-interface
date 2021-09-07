import styled from 'styled-components'

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  & img {
    width: 101px;
    width: 99px;
  }
`

export const Divider = styled('div')<{ width?: string; left?: string; backgroundColor?: string; top?: string }>`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    margin-top: ${({ top }) => top};
    height: 1px;
    width: ${({ width }) => width};
    left: ${({ left }) => left};
    background-color: #f0f0f0;
    background-color: ${({ backgroundColor }) => backgroundColor};
  }
`

export const TextContainer = styled('div')<{ marginLeft?: string; width?: string; flexDirection?: string }>`
  display: flex;
  flex-direction: column;
  flex-direction: ${({ flexDirection }) => flexDirection};
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

export const DeListingContainer = styled('div')<{ height?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => height};
  margin: 0px 18px 0px 30px;
`

export const AuctionTimer = styled.div`
  display: flex;
  align-items: center;
`

export const AmountContainer = styled.div`
  display: flex;
  align-items:center;


  & div{
    margin-left:65px
  }
`
