import React, { useEffect, useState } from 'react'
import { DropDownCategory } from 'components/DropDown'
import { InputFile, LabelBlack, LabelWithCheck } from 'components/Input'
import { CATEGORIES, StepProps } from '../../constants'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useIpfsHash, useIpfsProgress, useIpfsStatus, useUploadToIpfs } from 'state/ipfs/hooks'
import { ipfsEnumStatus } from 'state/ipfs/actions'

const DropDown = styled.div`
  margin: 10vh 0;
`

const Label = styled.div`
  margin-bottom: 2vh;
`

const Step1: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  const [filename, setFilename] = useState(state.dataHash)

  const { t } = useTranslation()

  const upload = useUploadToIpfs()

  const progress = parseInt(useIpfsProgress())

  const hash = useIpfsHash()

  const status = useIpfsStatus()

  useEffect(() => {
    if (status === ipfsEnumStatus.DONE && filename !== '') {
      handleChange({ target: { name: 'dataHash', value: 'ipfs://' + hash } })
    }
  }, [filename, status, hash, handleChange])

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
        name="dataHash"
        label={t('uploadNFT')}
        value={state.dataHash}
        onChange={(e: any) => {
          if (e.target.files[0] === null) {
            setFilename('')
            handleChange({ target: { name: 'dataHash', value: '' } })
          } else {
            setFilename(e.target.files[0].name)
            upload({ path: e.target.files[0].name, content: e.target.files[0] })
          }
        }}
        progress={progress}
        filename={filename}
        error={missing.includes('dataHash')}
      />
    </React.Fragment>
  )
}

export default Step1
