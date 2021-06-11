import React from 'react'
import { DropDownDateType } from 'components/DropDown'
import { Input, InputNumberButtons } from 'components/Input'
import { StepProps } from '../../constants'
import PriceArrows from './../../assets/icons/pricearrows.svg'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 5vh 0;
`

const BidOffers = styled.div`
  margin-bottom: 2vh;
`

const Radios = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 35%;
`

const MinBid = styled.div`
  margin: 3vh 0;
`

const OpenFor = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 60%;
`

const RadioLabel = styled.span`
  font-weight: bold;
  font-size: 14px;
  margin-left: 1vw;
`

const Step3: React.FC<StepProps> = ({ state, handleChange }: StepProps) => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <Row>
        <Input name="price" label="NFTprice" value={state.price} onChange={handleChange} number />
        <img src={PriceArrows} alt="Currency conversion" />
        <Input name="usd" currency="USD" value={state.price} onChange={() => {}} number />
      </Row>
      <BidOffers>{t('bidsOffers')}</BidOffers>
      <Radios>
        <div>
          <input
            type="radio"
            name="bidsOffers"
            value="true"
            checked={state.bidsOffers === 'true'}
            onChange={handleChange}
          />
          <RadioLabel>{t('allowed')}</RadioLabel>
        </div>
        <div>
          <input
            type="radio"
            name="bidsOffers"
            value="false"
            checked={state.bidsOffers === 'false'}
            onChange={handleChange}
          />
          <RadioLabel>{t('notAllowed')}</RadioLabel>
        </div>
      </Radios>
      {state.bidsOffers === 'true' && (
        <div>
          <MinBid>
            <Input name="minBid" label="minBid" value={state.minBid} onChange={handleChange} number />
          </MinBid>
          <OpenFor>
            <div>{t('openFor')}</div>
            <InputNumberButtons name="openFor" value={state.openFor} onChange={handleChange} />
            <DropDownDateType
              name="type"
              options={['Day', 'Week', 'Month', 'Year']}
              value={state.type}
              onChange={handleChange}
            />
          </OpenFor>
        </div>
      )}
    </React.Fragment>
  )
}

export default Step3
