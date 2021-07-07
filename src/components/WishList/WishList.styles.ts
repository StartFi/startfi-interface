import styled from 'styled-components'

export const WishListCard = styled.div`
  display: flex;
  width: 90%;
  height: 157px;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.5s;
  & img {
    width: 128px;
    height: 103px;
    border-radius: 4px;
    margin: 26px 25px 28px 27px;
  }
  /* &:hover {
    flex-grow: 0;
    transform: scale(1.1);
  } */
`

export const CardContent = styled.div`
  display: flex;
  margin: 26px 26px 28px 27px;
`
export const TagRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  & span {
    /* margin-left: 7rem; */
    font-weight: 500;
  }
`
export const TagContainer = styled('div')<{ marginLeft?: string; lastChildWidth?: string }>`
  display: flex;
  margin-left: ${({ marginLeft }) => marginLeft};
  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 87px;
    height: 35px;
    margin-right: 10px;
    background: #f4f4f4;
    border-radius: 4px;
    outline: none;
    border: transparent;
  }

  & :last-child {
    width: ${({ lastChildWidth }) => lastChildWidth ?? '87px'};
  }
`

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0px 25px 25px 25px;
  flex-direction: column;
  justify-content: space-between;
`

export const RemoveContainer = styled.div`
  /* width:100%auto; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -30px;
  margin-top:-5px;

  & div {
    display: flex;
    justify-content: start;
    align-items: center;
    & img {
      height: 20px;
      width: 20px;
      position: relative;
      left: 35px;
      margin-top: 30px;
    }
  }
`

export const NoListContainer = styled.div`
  margin-top: 12.438rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`
