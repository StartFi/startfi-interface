import React, { useEffect, useState } from 'react'
import { DropDownCategory } from 'components/DropDown'
import { InputFile, LabelWithCheck } from 'components/Input'
import { CATEGORIES, StepProps } from '../../constants'
import { useTranslation } from 'react-i18next'
import { useIpfsHash, useIpfsProgress, useIpfsStatus, useUploadToIpfs } from 'state/ipfs/hooks'
import { ipfsEnumStatus } from 'state/ipfs/actions'
import { LabelBlack } from 'components/Input/styles'
import { DropDown, Label } from './styles'

const Step1: React.FC<StepProps> = ({ state, handleChange, missing }: StepProps) => {
  const [filename, setFilename] = useState(state.filename)

  const [progress, setProgress] = useState(0)

  const { t } = useTranslation()

  const upload = useUploadToIpfs()

  const ipfsProgress = useIpfsProgress()

  const hash = useIpfsHash()

  const status = useIpfsStatus()

  useEffect(() => {
    if (status === ipfsEnumStatus.DONE && filename !== '') {
      handleChange({ target: { name: 'dataHash', value: 'ipfs://' + hash } })
      handleChange({ target: { name: 'filename', value: filename } })
    }
  }, [filename, status, hash, handleChange])

  useEffect(() => {
    setProgress(ipfsProgress)
  }, [ipfsProgress, setProgress])

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
          name='category'
          label={t('chooseCategory')}
          options={CATEGORIES}
          value={state.category}
          onChange={handleChange}
          width='30vw'
          showLabel={true}
          selectIcon={true}
        />
      </DropDown>

      <InputFile
        name='dataHash'
        label={t('uploadNFT')}
        value={state.dataHash}
        onChange={(e: any) => {
          if (e.target.files[0] === null) {
            setFilename('')
            handleChange({ target: { name: 'dataHash', value: '' } })
            setProgress(0)
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
