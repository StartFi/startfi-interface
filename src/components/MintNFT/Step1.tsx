import React, { useEffect, useState } from 'react'
import { DropDownCategory } from 'components/DropDown'
import { InputFile, LabelBlack, LabelWithCheck } from 'components/Input'
import { CATEGORIES, StepProps } from '../../constants'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useIpfsHashes, useIpfsProgress, useUploadToIpfs } from 'state/ipfs/hooks'

const DropDown = styled.div`
  margin: 10vh 0;
`

const Label = styled.div`
  margin-bottom: 2vh;
`

const Step1: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  const [filename, setFilename] = useState('')

  const { t } = useTranslation()

  const upload = useUploadToIpfs()

  const progress = useIpfsProgress()

  const hashes = useIpfsHashes()

  useEffect(() => {
    console.log(hashes)
    console.log(filename)
    if (hashes.length > 0 && filename) {
      let { fileName, hash } = hashes[hashes.length - 1]
      if (fileName === filename) handleChange({ target: { name: 'file', value: hash } })
    }
  }, [filename, hashes, handleChange])

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
        onChange={function Onhandle(event: Event) {
          console.log('event', event.target)
        }}
        error={missing.includes('file')}
      />
    </React.Fragment>
  )
}

export default Step1
