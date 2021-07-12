import React from 'react'
import { StepProps } from '../../constants'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Row } from 'theme'
import { Input } from 'components/Input'
import Label from 'components/Input/Label'

const Margin = styled(Row)`
  margin: 6vh 0 3vh 0;
`

const Radios = styled(Row)`
  width: 35%;
`

const Royalty = styled(Row)`
  width: 16vw;
  margin: 3vh 0;
`

const RadioLabel = styled.span`
  font-weight: bold;
  font-size: 14px;
  margin-left: 1vw;
`

const Text = styled.div`
  margin-left: 2vw;
`

const Step3: React.FC<StepProps> = ({ state, handleChange }: StepProps) => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <Margin>
        <Label text="royaltyShare" question="royaltyShareDescription" />
      </Margin>
      <Radios>
        <div>
          <input
            type="radio"
            name="royaltyShare"
            value="true"
            checked={state.royaltyShare === 'true'}
            onChange={handleChange}
          />
          <RadioLabel>{t('allowed')}</RadioLabel>
        </div>
        <div>
          <input
            type="radio"
            name="royaltyShare"
            value="false"
            checked={state.royaltyShare === 'false'}
            onChange={handleChange}
          />
          <RadioLabel>{t('notAllowed')}</RadioLabel>
        </div>
      </Radios>
      {state.royaltyShare === 'true' && (
        <Royalty>
          <Input name="royalty" value={state.royalty} onChange={handleChange} currency="%" number />
          <Text>Per Each resell</Text>
        </Royalty>
      )}
    </React.Fragment>
  )
}

export default Step3
