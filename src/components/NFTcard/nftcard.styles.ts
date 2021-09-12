import styled from 'styled-components'

export const Card = styled('div')<{ boxShadow?: string }>`
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 378px;
  border-radius: 8px;
  background-color: #ffffff;

  box-shadow: ${({ boxShadow }) => boxShadow};
  position: relative;
  cursor: pointer;
`
export const Media = styled.div`
  height: 176px;
  width: 256px;
  position: relative;
  top: 28px;
  left: 27px;

  /* padding: 28px 27px 0px 28px; */
`

export const CardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin:60px 0 20px 27px; */
  position: relative;
  top: 48px;
  left: 27px;
  & div {
    display: flex;
    align-items: center;
  }
`

export const Text = styled('p')<{ fontFamily?: string; FontWight?: string; fontSize?: string; margin?: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ FontWight }) => FontWight};
  font-size: ${({ fontSize }) => fontSize};
  margin: ${({ margin }) => margin};
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Actions = styled.div`
  display: flex;
  margin-top: auto;
  height: 45px;
  & div {
    width: 50%;
  }
`

export const WhishList = styled('div')<{ background?: string; width?: string; borderRadius?: string }>`
  display: flex;
  align-items: center;
  background-color: ${({ background }) => background};
  width: ${({ width }) => width};
  border-radius: 0px 0px 0px 8px;
  border-radius: ${({ borderRadius }) => borderRadius};
`
export const Bid = styled.div`
  display: flex;
  background-color: #000000;
  width: 100%;
  align-items: center;
  border-radius: 0px 0px 8px 0px;
`

export const ImageIcon = styled('img')<{ $opacity?: boolean }>`
  position: relative;
  left: 29px;
  z-index: 10;
  margin-right: 10px;
  opacity: ${({ $opacity }) => ($opacity ? '50%' : '')};
`
