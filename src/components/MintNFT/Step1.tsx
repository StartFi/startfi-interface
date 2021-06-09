import React, { useEffect, useState } from 'react'
import { DropDownCategory } from 'components/DropDown'
import { InputFile, LabelBlack, LabelWithCheck } from 'components/Input'
import { CATEGORIES, StepProps } from '../../constants'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useIpfsHash } from 'state/ipfs/hooks'

const DropDown = styled.div`
  margin: 10vh 0;
`

const Label = styled.div`
  margin-bottom: 2vh;
`

const Step1: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  const [filename] = useState('')

  const { t } = useTranslation()

  const hash = useIpfsHash()

  useEffect(() => {
    if (hash !== '' && filename) {
      handleChange({ target: { name: 'file', value: hash } })
    }
  }, [filename, hash, handleChange])

  return (
    <React.Fragment>
      <DropDown>
        <Label>
          <LabelWithCheck
            text={t('chooseCategoryLabel')}
            Label={LabelBlack}
            verified={state.category}
            error={missing.includes('category')}
          />
        </Label>
        <DropDownCategory
          name="category"
          label={t('chooseCategory')}
          options={CATEGORIES}
          value={state.category}
          onChange={handleChange}
        />
      </DropDown>
      <InputFile
        name="file"
        label={t('uploadNFT')}
        value={state.file}
        onChange={function Onhandle(event: Event) {
          console.log('event', event.target)
        }}
        error={missing.includes('file')}
      />
    </React.Fragment>
  )
}

export default Step1
