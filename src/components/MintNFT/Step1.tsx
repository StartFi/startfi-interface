import React from 'react'
import { Box } from '@material-ui/core'
import { DropDownCategory } from 'components/DropDown'
import { InputFile, LabelBlack, LabelWithCheck } from 'components/Input'
import { CATEGORIES, StepProps } from '../../constants'
import { useTranslation } from 'react-i18next'

const Step1: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  const { t } = useTranslation()
  
  return (
    <React.Fragment>
      <Box mt={8} mb={8}>
        <LabelWithCheck
          text={t('chooseCategoryLabel')}
          Label={LabelBlack}
          verified={state.category}
          error={missing.includes('category')}
        />
        <Box mt={2}>
          <DropDownCategory
            name="category"
            label={t('chooseCategory')}
            options={CATEGORIES}
            value={state.category}
            onChange={handleChange}
          />
        </Box>
      </Box>
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
