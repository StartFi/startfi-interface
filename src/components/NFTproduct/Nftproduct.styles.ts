import styled from 'styled-components'

export const Container = styled.div`
  padding: 4vh 3.2vw;
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 130px;
`

export const LeftGrid = styled.div`
  width: 50%;
`

export const RightGrid = styled.div`
  width: 50%;
`
export const ImgCard = styled.div`
  width: 444px;
  height: 500px;
  margin-top: 30px;
  position: relative;
  border-radius: 8px;

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  & p {
    height: 50px;
    width: 147px;
    background-color: #2e2e2e;
    color: #ffffff;
    position: absolute;
    top: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const LeftTextCard = styled.div`
  height: 223px;
  width: 444px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #fbfbfb;
`

export const CreatedTitle = styled.div`
  height: 57px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    color: #323232;

    & span {
      font-weight: 500;
      font-size: 1.125rem;
      color: #000000;
      margin-left: 7px;
    }
  }
`

export const CreatedText = styled.div`
  padding-right: 27px;
  padding-left: 27px;
  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.75rem;
    color: #000000;
    text-align: justify;
  }
`

export const RightTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 12px;
  font-family: Roboto;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.1875rem;
`

export const RightSubTitle = styled.div`
  width: 445px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 17px;
`

export const PublisherCard = styled('div')<{ height?: string }>`
  height: ${({ height }) => height};
  width: 445px;
  border-radius: 8px;
  margin-bottom: 30px;
  background-color: #fbfbfb;
  display: flex;
  align-items: center;
  & p {
    padding-left: 22px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    color: #323232;
    & span {
      font-weight: 500;
      font-size: 1.125rem;
      color: #000000;
      margin-left: 7px;
    }
  }
`

export const BuyCard = styled.div`
  height: 223px;
  width: 445px;
  padding-left: 23px;
  border-radius: 8px;
  margin-bottom: 30px;
  background-color: #fbfbfb;
`

export const BuyCost = styled.div`
  position: relative;
  top: 16px;
  font-family: Roboto;
  & p {
    font-weight: 400px;
    font-size: 1rem;
    color: #323232;
    & span {
      font-weight: 900;
      font-size: 1.375rem;
      color: #000000;
    }
  }
`

export const BuyButtons = styled('div')<{opacity?:boolean}>`
  display: flex;
  position: relative;
  top: 29px;
& img{
  position: absolute;
    top: 37%;
    left: 30px;
    opacity:${({ opacity}) => opacity?'50%':''};
}

  & button {
    width: 175px;
    height: 50px;
    background: #fbfbfb;
    border: 1px solid #ececec;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 28px;

  }
`

export const ImageIcon = styled('img')<{opacity?:boolean}>`
   position: absolute;
    top: 37%;
    left: 30px;
    opacity:${({ opacity}) => opacity?'50%':''};

`

export const BuyNow = styled.div`
  & button {
    position: relative;
    top: 30px;
    width: 378px;
    height: 50px;
    margin-top: 30px;
    border-radius: 4px;
    background-color: #000000;
    border: 1px solid #000000;
    color: #ffffff;
    font-size: 1rem;
    font-family: Roboto;
    letter-spacing: 0.04em;
    cursor: pointer;
  }
`

export const DescriptionCard = styled('div')<{ overflowY?: string }>`
  height: 317px;
  width: 445px;
  border-radius: 8px;
  margin-bottom: 30px;
  overflow-y: ${({ overflowY }) => overflowY};
  background-color: #fbfbfb;
`

export const DescriptionTitle = styled.div`
  height: 57px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & p {
    padding-left: 19px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.1875rem;
    color: #000000;
  }
`
export const DescriptionText = styled.div`
  padding-right: 27px;
  padding-left: 27px;

  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.75rem;
    color: #000000;
    text-align: justify;
    letter-spacing: 0.04em;
  }
`
