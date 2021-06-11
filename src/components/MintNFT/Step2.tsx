import React from 'react'
import { Input } from 'components/Input'
import { StepProps } from '../../constants'
import Tags from 'components/Tags'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  flex: 1 1 auto;
`

const Step2: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  return (
    <Container>
      <Input
        name="name"
        label="NFTname"
        value={state.name}
        onChange={handleChange}
        error={missing.includes('name')}
        underline
      />
      <Tags name="tags" max={10} onChange={handleChange} />
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
    </Container>
  )
}

export default Step2
