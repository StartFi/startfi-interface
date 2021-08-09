import styled from 'styled-components'

export const BalanceContainer = styled('div')<{ display?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  & div {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    /* width: 40%; */
  }
`

export const StifiContainer=styled.div`
height:57px;
width:85px;

`
