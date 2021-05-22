import React from 'react'
import { Grid } from '@material-ui/core'
import { Input } from 'components/Input'
import { StepProps } from '../../constants'

const Step2: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  return (
    <Grid container direction="column" justify="space-around" style={{ flex: '1 1 auto' }}>
      <Input
        name="name"
        label="NFT Name"
        value={state.name}
        onChange={handleChange}
        error={missing.includes('name')}
        underline
      />
      <Input
        name="details"
        label="NFT Details"
        placeholder="Write Details about your product"
        value={state.details}
        onChange={handleChange}
        characters={150}
        textarea={2}
        error={missing.includes('details')}
      />
      <Input
        name="description"
        label="NFT Description"
        placeholder="Write Details about your product"
        value={state.description}
        onChange={handleChange}
        characters={500}
        textarea={4}
        error={missing.includes('description')}
      />
    </Grid>
  )
}

export default Step2
