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
  const [filename, setFilename] = useState(state.image)

  const { t } = useTranslation()

  const upload = useUploadToIpfs()

  const progress = useIpfsProgress()

  const hashes = useIpfsHashes()

  useEffect(() => {
    if (hashes.length > 0 && filename) {
      var { fileName, hash } = hashes[hashes.length - 1]
      if (fileName === filename) handleChange({ target: { name: 'image', value: hash } })
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
        name="image"
        label={t('uploadNFT')}
        value={state.imaghe}
        onChange={(e: any) => {
          if (e.target.files[0] === null) {
            setFilename('')
            handleChange({ target: { name: 'image', value: '' } })
          } else {
            setFilename(e.target.files[0].name)
            upload({ path: e.target.files[0].name, content: e.target.files[0] })
          }
        }}
        progress={progress}
        filename={filename}
        error={missing.includes('image')}
      />
    </React.Fragment>
  )
}

export default Step1
