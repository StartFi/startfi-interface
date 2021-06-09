import styled from 'styled-components'


export const InventoryCard = styled.div`

  height: 500px;
  width: 92%;
  margin: 0px auto 0px auto;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);
  /* border-radius: 8px 8px 0px 0px; */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 15px;
    border: 1px solid #E3E3E3;
    background-color:#EFEFEF;
    border-radius:100px;

}
&::-webkit-scrollbar-thumb{
  border-radius:100px;
  background-color: #B5B5B5;
}

`

export const Container = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 4vh 3.2vw;
`

export const CardContentContainer =styled.div`

`



