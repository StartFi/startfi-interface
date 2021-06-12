import styled from 'styled-components'

export const Card = styled.div`
display:flex;
flex-direction:column;
  width: 310px;
  height: 378px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
  position: relative;

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
  position: relative;
  top: 38px;
  left: 27px;
`

export const Text = styled('p')<{ fontFamily?: string; FontWight?: string; fontSize?: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ FontWight }) => FontWight};
  font-size: ${({ fontSize }) => fontSize};
  width:90%;
  overflow: hidden;
    text-overflow: ellipsis;

`

export const Actions = styled.div`
  display: flex;
  margin-top:auto;
  height: 45px;

`

export const WhiteList = styled.div`
  display: flex;
  align-items: center;
  background-color: #ededed;
  border-radius: 0px 0px 0px 8px;
`
export const Bid = styled.div`
  display: flex;
  background-color: #000000;
  width: 100%;
  align-items: center;
  border-radius: 0px 0px 8px 0px;
`

export const ImageIcon = styled.img`
  position: relative;
  left: 29px;
`
