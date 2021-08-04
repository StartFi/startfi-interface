import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`

export const Left = styled.div`
  flex-grow: 1;
  border-right: 1px solid #eeeeee;
  padding-right: 4vw;
`

interface PaymentCardProps {
  readonly minHeight: string
}

export const Right = styled.div<PaymentCardProps>`
  width: 28vw;
  padding: 3vh 2vw;
  background-color: #fafafa;
  border-radius: 8px;
  min-height: ${({ minHeight }) => minHeight};
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`

export const MarginLeft = styled.div`
  margin-left: 4vw;
`

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

export const Rows = styled(Row)`
  margin-bottom: 5vh;
`

export const SpaceBetween = styled(Row)`
  justify-content: space-between;
  align-items: baseline;
`

export const Baseline = styled(Row)`
  align-items: baseline;
`

export const Column = styled.div`
  margin-left: 2vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
`

export const Bold = styled.div`
  font-weight: bold;
  letter-spacing: 0.04em;
  font-size: 18px;
  color: #000000;
  text-transform: capitalize;
`

export const MarginRight = styled(Bold)`
  min-width: 7vw;
  margin-right: 1vw;
`

export const Bold16 = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0.04em;
  margin-right: 1vw;
`

export const Text = styled.div`
  letter-spacing: 0.04em;
  color: #323232;
`

export const TextBlack = styled(Text)`
  color: #000000;
  line-height: 28px;
`

export const SemiBold = styled.div`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #000000;
  text-transform: capitalize;
`

export const Border = styled.div`
  border-bottom: 1px solid #eeeeee;
  width: 100%;
`

export const MarginLeftBorder = styled(Border)`
  margin-left: -1vw;
`

export const MarginBorder = styled(Border)`
  margin: 2vh 0;
  width: 98%;
`

export const MarginBottom = styled.div`
  margin-bottom: 1.5vh;
`

export const Img = styled.img`
  width: 13vw;
  height: 26vh;
  border-radius: 8px;
  border: none;
`

export const ButtonConfirmBid = styled.button`
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  width: 24vw;
  height: 6vh;
`
export const ButtonBlack = styled(ButtonConfirmBid)`
  background-color: #000000;
  color: #ffffff;
`
export const ButtonTransparent = styled(ButtonConfirmBid)`
  background-color: transparent;
`

export const ButtonTransparentBorder = styled(ButtonTransparent)`
  border: 1px solid #000000;
`
