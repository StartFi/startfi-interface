import React from 'react'
import { Box, FormControlLabel, Grid, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import { DropDownDateType } from 'components/DropDown'
import { Input, InputNumberButtons } from 'components/Input'
import { StepProps } from '../../constants'

const useStyles = makeStyles({
  label: {
    fontWeight: 'bold',
    fontSize: '0.875rem'
  },
  radio: {
    color: 'black',
    '&$checked': {
      color: 'black'
    }
  },
  checked: {}
})

const Step3: React.FC<StepProps> = ({ state, handleChange }: StepProps) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Box mt={5} mb={4}>
        <Input name="price" label="NFT Price" value={state.price} onChange={handleChange} number />
      </Box>
      <Box mb={1}>Bids and offers</Box>
      <RadioGroup row name="bidsoffers" value={state.bidsoffers} onChange={handleChange}>
        <FormControlLabel
          classes={{ label: classes.label }}
          value={'true'}
          control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
          label="Allowed"
        />
        <FormControlLabel
          classes={{ label: classes.label }}
          value={'false'}
          control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
          label="Not Allowed"
        />
      </RadioGroup>
      {state.bidsoffers === 'true' && (
        <Box>
          <Box mt={3} mb={3}>
            <Input name="bid" label="Minimum Bidding" value={state.price} onChange={handleChange} number />
          </Box>
          <Grid container direction="row" justify="space-between" alignItems="center" style={{ width: '60%' }}>
            <Box>Open for</Box>
            <InputNumberButtons />
            <DropDownDateType
              name="type"
              options={['Day', 'Week', 'Month', 'Year']}
              value={state.type}
              onChange={handleChange}
            />
          </Grid>
        </Box>
      )}
    </React.Fragment>
  )
}

export default Step3
