import React, { useState } from 'react'
import { StepProps } from '../../constants'
import { useTranslation } from 'react-i18next'
import { Input } from 'components/Input'
import Label from 'components/Input/Label'
import { Margin, Radios, RadioLabel, Royalty, Text } from './styles'

const Step3: React.FC<StepProps> = ({ state, handleChange }: StepProps) => {
  const { t } = useTranslation()

  const [royalty, setRoyalty] = useState(state.royalty ? true : false)

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
          <input type="radio" checked={!royalty} onChange={() => setRoyalty(false)} />
          <RadioLabel>{t('notAllowed')}</RadioLabel>
        </div>
      </Radios>

      {royalty && (
        <Royalty>
          <Input
            name="royalty"
            value={state.royalty}
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
