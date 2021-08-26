import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'components/Input'
import Label from 'components/Input/Label'
import { Margin, Radios, RadioLabel, Royalty, Text } from '../MintCard.tsx/styles'
import { useAddNFT } from 'state/marketplace/hooks'

const Step3: React.FC = () => {
  const { t } = useTranslation()

  const { nft, handleChange } = useAddNFT()

  const [royalty, setRoyalty] = useState(nft.royalty ? true : false)

  return (
    <React.Fragment>
      <Margin>
        <Label text="royaltyShare" question="royaltyShareDescription" />
      </Margin>

      <Radios>
        <div>
          <input type="radio" checked={royalty} onChange={() => setRoyalty(true)} />
          <RadioLabel>{t('allowed')}</RadioLabel>
        </div>

        <div>
          <input
            type="radio"
            checked={!royalty}
            onChange={() => {
              handleChange(0, 'royalty')
              setRoyalty(false)
            }}
          />
          <RadioLabel>{t('notAllowed')}</RadioLabel>
        </div>
      </Radios>

      {royalty && (
        <Royalty>
          <Input
            name="royalty"
            value={nft.royalty}
            onChange={handleChange}
            currency="%"
            outlineWidth="6vw"
            inputWidth="3vw"
            number
          />
          <Text>{t('perEachResell')}</Text>
        </Royalty>
      )}
    </React.Fragment>
  )
}

export default Step3
