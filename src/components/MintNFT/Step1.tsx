import React from 'react'
import { Box } from '@material-ui/core'
import { DropDownCategory } from 'components/DropDown'
import { InputFile, LabelBlack, LabelWithCheck } from 'components/Input'
import { CATEGORIES, StepProps } from '../../constants'

const Step1: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  return (
    <React.Fragment>
      <Box mt={8} mb={8}>
        <LabelWithCheck
          text="Choose your NFT Product Category"
          Label={LabelBlack}
          verified={state.category}
          error={missing.includes('category')}
        />
        <Box mt={2}>
          <DropDownCategory
            name="category"
            label="Choose your NFT From our Categories"
            options={CATEGORIES}
            value={state.category}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <InputFile
        name="file"
        label="Uplaod your NFT"
        value={state.file}
        onChange={handleChange}
        error={missing.includes('file')}
      />
    </React.Fragment>
  )
}

export default Step1
