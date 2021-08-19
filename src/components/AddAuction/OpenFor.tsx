import React, { useEffect, useState } from 'react'
import { DropDownDateType } from 'components/DropDown'
import { InputNumberButtons } from 'components/Input'
import { useTranslation } from 'react-i18next'
import { OpenForContainer } from '../MintCard.tsx/styles'
import { useAddAuction } from 'state/marketplace/hooks'

const OpenFor: React.FC = () => {
  const { t } = useTranslation()

  const { handleChange, missing } = useAddAuction()

  const [expire, setExpire] = useState({
    openFor: 0,
    type: 'Day'
  })

  const handleExpire = (value: any, name: string) => setExpire({ ...expire, [name]: value })

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
      handleChange(date.valueOf(), 'expireTimestamp')
    }
  }, [expire, handleChange])

  return (
    <OpenForContainer>
      <div>{t('openFor')}</div>
      <InputNumberButtons name="openFor" value={expire.openFor} onChange={handleExpire} error={missing.includes('expireTimestamp')}/>
      <DropDownDateType
        name="type"
        options={['Day', 'Week', 'Month', 'Year']}
        value={expire.type}
        onChange={handleExpire}
        showLabel={true}
      />
    </OpenForContainer>
  )
}

export default OpenFor
