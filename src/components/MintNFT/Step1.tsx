import React from 'react'
import { DropDownCategory } from 'components/DropDown'
import { InputFile, LabelBlack, LabelWithCheck } from 'components/Input'
import { CATEGORIES, StepProps } from '../../constants'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const DropDown = styled.div`
  margin: 10vh 0;
`

const Label = styled.div`
  margin-bottom: 2vh;
`

const Step1: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  const { t } = useTranslation()

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
        // onChange={(e: any) => upload({path:e.target.files[0].name,content:e.target.files[0]})}
        //f({path:e.target.files[0].name, content:e.target.files[0].arrayBuffer()})
        // progress={s}
        error={missing.includes('file')}
      />
    </React.Fragment>
  )
}

export default Step1
