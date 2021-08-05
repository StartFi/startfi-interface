import React, { useEffect, useState } from 'react'
import { DropDownDateType } from 'components/DropDown'
import { Input, InputNumberButtons } from 'components/Input'
import { useTranslation } from 'react-i18next'
import { Auction } from 'services/models/Auction'
import { BidOffers, MinBid, OpenFor, Price, QualifyAmount, RadioLabel, Radios } from './styles'
import InputSTFI from 'components/Input/InputSTFI'

interface Step7Props {
  auction: Auction
  setAuction: React.Dispatch<React.SetStateAction<Auction>>
}

const Step7: React.FC<Step7Props> = ({ auction, setAuction }) => {
  const { t } = useTranslation()

  const [expire, setExpire] = useState({
    openFor: 0,
    type: 'Day'
  })

  const handleChange = (e: any) => setAuction({ ...auction, [e.target.name]: e.target.value })
  const handleExpire = (e: any) => setExpire({ ...expire, [e.target.name]: e.target.value })

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

  return (
    <React.Fragment>
      <Price>
        <InputSTFI
          name="listingPrice"
          label="NFTprice"
          value={auction.listingPrice}
          onChange={value => setAuction({ ...auction, isForSale: true, listingPrice: value })}
        />
      </Price>
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
      {auction.isForBid && (
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
              showLabel={true}
            />
          </OpenFor>
          <QualifyAmount>
            <InputSTFI
              name="qualifyAmount"
              label="qualifyAmount"
              value={auction.qualifyAmount || 0}
              onChange={value => setAuction({ ...auction, qualifyAmount: value })}
            />
          </QualifyAmount>
        </div>
      )}
    </React.Fragment>
  )
}

export default Step7
