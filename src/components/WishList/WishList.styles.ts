import styled from 'styled-components'

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 18px 25px 25px 10px;
  flex-direction: column;
`
export const RemoveContainer = styled('div')<{ opacity?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div {
    display: flex;
    justify-content: start;
    align-items: center;
    opacity: 50%;
    & img {
      height: 20px;
      width: 20px;
      position: relative;
      left: 10px;
    }
  }
`
export const ImgDIV = styled.div`
  width: 128px;
  height: 103px;
  border-radius: 4px;

  margin: 26px 25px 28px 27px;
  & img {
    width: 128px;
    height: 103px;
    border-radius: 4px;
  }
`
export const WishListCard = styled.div`
  display: flex;
  width: 90%;
  height: 157px;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
  border-radius: 8px;
  cursor:pointer;

  &:hover {
    ${RemoveContainer} {
      & div {
        opacity: 100%;
      }
    }
  }
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

export const NoListContainer = styled.div`
  margin-top: 12.438rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Counter = styled.div`
  display: inline-block;
  & p {
    display: inline-block;
  }
  & :first-child {
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 1rem;
    color: #000000;
    margin-right: 2px;
  }
  & :last-child {
    margin-right: 5px;
  }
`

export const CounterContainer = styled.div`
  width: 321px;
  height: 33px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: #eaeaea;
`
