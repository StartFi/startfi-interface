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
          text={t("Choose your NFT Product Category")}
          Label={LabelBlack}
          verified={state.category}
          error={missing.includes('category')}
        />
        <Box mt={2}>
          <DropDownCategory
            name="category"
            label={t("Choose your NFT From our Categories")}
            options={CATEGORIES}
            value={state.category}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <InputFile
        name="file"
        label={t("Uplaod your NFT")}
        value={state.file}
        // onChange={(e:any)=>upload({fileName:e.target.files[0].name+"."+e.target.files[0].type, content:e.target.files[0]})}
        // progress={}
        error={missing.includes('file')}
      />
    </React.Fragment>
  )
}

export default Step1
