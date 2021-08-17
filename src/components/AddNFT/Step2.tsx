import React from 'react'
import { Input } from 'components/Input'
import Tags from 'components/Tags'
import { Step2Container } from '../MintCard.tsx/styles'
import { useAddNFT } from 'state/marketplace/hooks'

const Step2: React.FC = () => {
  const { nft, handleChange, missing } = useAddNFT()

  return (
    <Step2Container>
      <Input
        name="name"
        label="NFTname"
        value={nft.name}
        onChange={handleChange}
        error={missing.includes('name')}
        underline
      />

      <Tags name="tags" max={10} onChange={handleChange} value={nft.tags || []} />

      <Input
        name="description"
        label="NFTdescription"
        placeholder="writeNFTdescription"
        value={nft.description}
        onChange={handleChange}
        characters={500}
        textarea={4}
        error={missing.includes('description')}
      />
    </Step2Container>
  )
}

export default Step2
