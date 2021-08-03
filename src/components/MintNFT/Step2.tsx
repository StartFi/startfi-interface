import React from 'react'
import { Input } from 'components/Input'
import { StepProps } from '../../constants'
import Tags from 'components/Tags'
import { Step2Container } from './styles'

const Step2: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  return (
    <Step2Container>
      <Input
        name="name"
        label="NFTname"
        value={state.name}
        onChange={handleChange}
        error={missing.includes('name')}
        underline
      />

      <Tags name="tags" max={10} onChange={handleChange} value={state.tags} />
      
      <Input
        name="description"
        label="NFTdescription"
        placeholder="writeNFTdescription"
        value={state.description}
        onChange={handleChange}
        characters={500}
        textarea={4}
        error={missing.includes('description')}
      />
    </Step2Container>
  )
}

export default Step2
