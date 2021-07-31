import React, { useEffect, useState } from 'react'
import { DropDownDateType } from 'components/DropDown'
import { Input, InputNumberButtons } from 'components/Input'
import PriceArrows from './../../assets/icons/pricearrows.svg'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Row } from 'theme/components'
import { Auction } from 'services/models/Auction'
import { useWeb3React } from '@web3-react/core'

import {
  NoStakes,
  GetNow,
  Name,
  Stakes
} from '../NFTproduct/Nftproduct.styles'
import {useGetReserves} from '../../hooks/startfiStakes'
const Price = styled(Row)`
  width: 70%;
  margin: 5vh 0;
`

const QualifyAmount = styled(Price)`
  width: 80%;
`

const BidOffers = styled.div`
  margin-bottom: 2vh;
`

const Radios = styled(Row)`
  width: 35%;
`

const MinBid = styled.div`
  margin: 3vh 0;
`

const OpenFor = styled(Row)`
  width: 60%;
`

const RadioLabel = styled.span`
  font-weight: bold;
  font-size: 14px;
  margin-left: 1vw;
`

interface Step7Props {
  auction: Auction
  setAuction: React.Dispatch<React.SetStateAction<Auction>>
}
const Step7: React.FC<Step7Props> = ({ auction, setAuction }) => {
  const { t } = useTranslation()

  const [expire, setExpire] = useState({
    openFor: 0,
    type: ''
  })
  const { account } = useWeb3React()
const listqualifyPercentage =1;
const  base=100;
  const handleChange = (e: any) => setAuction({ ...auction, [e.target.name]: e.target.value })

  const handleExpire = (e: any) => setExpire({ ...expire, [e.target.name]: e.target.value })
  const getReserves=useGetReserves()

const [enoughStakes, setEnoughStakes] = useState(false)
const [stakes, setStakes] = useState(0)
const [requiredStakes, setRequiredStakes] = useState(0)
  useEffect(() => {
    const getUserReserves=async () => {
    const reservesHexString = await getReserves(account as string)
    const reserves = reservesHexString?.length < 5 ? parseInt(reservesHexString, 16) : reservesHexString

    if(reserves>0){
      setStakes(reserves)
    }
    }
account&&getUserReserves();
  }, [stakes])

  useEffect(() => {
    if (expire.openFor && expire.type) {
      const date = new Date()
      switch (expire.type) {
        case 'Day':
          date.setDate(date.getDate() + expire.openFor)
          break
        case 'Week':
          date.setDate(date.getDate() + expire.openFor * 7)
          break
        case 'Month':
          date.setMonth(date.getMonth() + expire.openFor)
          break
        case 'Year':
          date.setFullYear(date.getFullYear() + expire.openFor)
          break
        default:
      }
      setAuction(auction => {
        return { ...auction, expireTimestamp: date.valueOf() }
      })
    }
  }, [expire, setAuction])
const handelPrice=(price)=>{
  //listingPrice.mul(listqualifyPercentage).div( listqualifyPercentageBase); 
  setRequiredStakes((price*listqualifyPercentage)/base) 
  setAuction({ ...auction, listingPrice:price })
  if(requiredStakes<=stakes){
    setEnoughStakes(true)
  }
}
  return (
    <React.Fragment>
            <BidOffers>{t('bidsOffers')}</BidOffers>
      <Radios>
        <div>
          <input
            type="radio"
            name="isForBid"
            checked={auction.isForBid}
            onChange={() => setAuction({ ...auction, isForBid: true })}
          />
          <RadioLabel>{t('allowed')}</RadioLabel>
        </div>
        <div>
          <input
            type="radio"
            name="isForBid"
            checked={!auction.isForBid}
            onChange={() => setAuction({ ...auction, isForBid: false })}
          />
          <RadioLabel>{t('notAllowed')}</RadioLabel>
        </div>
      </Radios>

      {auction.isForBid ? (
        <div>
          <MinBid>
            <Input name="minBid" label="minBid" value={auction.minBid} onChange={handleChange} number />
          </MinBid>
       
          <OpenFor>
            <div>{t('openFor')}</div>
            <InputNumberButtons name="openFor" value={expire.openFor} onChange={handleExpire} />
            <DropDownDateType
              name="type"
              options={['Day', 'Week', 'Month', 'Year']}
              value={expire.type}
              onChange={handleExpire}
            />
          </OpenFor>
          <Price>
        <Input
          name="listingPrice"
          label="NFTprice"
          value={auction.listingPrice}
          onChange={(e: any) => setAuction({ ...auction, isForSale: true, listingPrice: e.target.value })}
          number
        />
        <img src={PriceArrows} alt="Currency conversion" />
        <Input name="usd" currency="USD" value={auction.listingPrice} onChange={() => {}} number />
      </Price>
          <QualifyAmount>
            <Input
              name="qualifyAmount"
              label="qualifyAmount"
              value={auction.qualifyAmount}
              onChange={handleChange}
              question="qualifyAmountDesc"
              number
            />
            <img src={PriceArrows} alt="Currency conversion" />
            <Input name="usd" currency="USD" value={auction.qualifyAmount} onChange={() => {}} number />
          </QualifyAmount>
        </div>
      ):(   <div>
          <Price>
        <Input
          name="listingPrice"
          label="NFTprice"
          value={auction.listingPrice}
          onChange={(e: any) => handelPrice(e.target.value)}
          number
        />
        <img src={PriceArrows} alt="Currency conversion" />
        <Input name="usd" currency="USD" value={auction.listingPrice} onChange={() => {}} number />
      </Price>
      <Name>
            {!enoughStakes && (
              <Stakes>
                <NoStakes>{t('needsMoreStakes')}</NoStakes>
                <GetNow onClick={() => console.log('redirect me to where I can deposit stakes')}>{t('getNow')}</GetNow>
              </Stakes>
            )}
          </Name>
      </div> )}
    </React.Fragment>
  )
}

export default Step7
