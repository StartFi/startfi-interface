import styled from "styled-components";

export const InventoryCard = styled('div')<{borderRadius?:string;marginTop?:string}>`
  height: 500px;
  width: 92%;
  margin: 0px auto 0px auto;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);
  overflow-y: auto;
  border-radius: ${({ borderRadius }) => borderRadius};
  margin-top:${({ marginTop}) => marginTop};;
  &::-webkit-scrollbar {
    width: 15px;
    border: 1px solid #e3e3e3;
    background-color: #efefef;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #b5b5b5;
  }
`
export const MiniInvCard = styled.div`
  display: flex;
  width: 46.1%;
  height: 157px;
  margin: 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.5s;

  &:hover {
    flex-grow: 0;
    transform: scale(1.1);
  }
`

export const CardContent = styled.div`
  display: flex;
  margin: 26px 26px 28px 27px;
`
export const Image = styled.img`
  width: 128px;
  height: 103px;
  border-radius: 4px;
`
export const TagContainer = styled('div')<{marginLeft?:string,lastChildWidth?:string}>`
  display: flex;
  margin-left: ${({marginLeft})=>marginLeft};
  & div{
    display: flex;
    align-items:center;
    justify-content:center;
    width: 87px;
    height: 35px;
    margin-right: 10px;
    background: #f4f4f4;
    border-radius: 4px;
    outline: none;
    border: transparent;
  }

  & :last-child {
    width: ${({lastChildWidth})=>lastChildWidth??'87px'};
  }

`

export const TextContainer = styled.div`
  display: flex;
  margin-left: 25px;
  flex-direction: column;
  justify-content: space-between;
`