import React from 'react'
import { Box, FormControlLabel, Grid, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import { DropDownDateType } from 'components/DropDown'
import { Input, InputNumberButtons } from 'components/Input'
import { StepProps } from '../../constants'
import PriceArrows from "./../../assets/icons/pricearrows.svg"
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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

const Row = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: center;
width: 90%;
margin: 5vh 0;
`

const Img = styled.img`
margin-right: 2vw;
`

const Step3: React.FC<StepProps> = ({ state, handleChange }: StepProps) => {

  const { t } = useTranslation()

  const classes = useStyles()

  return (
    <React.Fragment>
      <Row>
        <Input name="price" label="NFT Price" value={state.price} onChange={handleChange} number />
        <Img src={PriceArrows} alt="Currency conversion"/>
        <Input name="usd" currency="USD" value={state.price} onChange={()=>{}} number />
      </Row>
      <Box mb={1}>{t('Bids and offers')}</Box>
      <RadioGroup row name="bidsoffers" value={state.bidsoffers} onChange={handleChange}>
        <FormControlLabel
          classes={{ label: classes.label }}
          value={'true'}
          control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
          label={t("Allowed")}
        />
        <FormControlLabel
          classes={{ label: classes.label }}
          value={'false'}
          control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
          label={t("Not Allowed")}
        />
      </RadioGroup>
      {state.bidsoffers === 'true' && (
        <Box>
          <Box mt={3} mb={3}>
            <Input name="bid" label="Minimum Bidding" value={state.price} onChange={handleChange} number />
          </Box>
          <Grid container direction="row" justify="space-between" alignItems="center" style={{ width: '60%' }}>
            <Box>{t('Open for')}</Box>
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
