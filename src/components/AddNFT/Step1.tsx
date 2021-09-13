import React, { useEffect, useState } from 'react'
import { DropDownCategory } from '../../UI/DropDown'
import { InputFile, LabelWithCheck } from '../../UI/Input'
import { CATEGORIES } from '../../constants'
import { useTranslation } from 'react-i18next'
import { useIPFS } from 'state/ipfs/hooks'
import { ipfsEnumStatus } from 'state/ipfs/actions'
import { LabelBlack } from '../../UI/Input/styles'
import { DropDown, Label } from '../MintCard.tsx/styles'
import { useAddNFT } from 'state/marketplace/hooks'

const Step1: React.FC = () => {
  const { t } = useTranslation()

  const { nft, handleChange, missing } = useAddNFT()

  const { upload, ipfsProgress, hash, status } = useIPFS()

  const [filename, setFilename] = useState(nft.filename)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (status === ipfsEnumStatus.DONE && filename !== '') {
      handleChange('ipfs://' + hash, 'dataHash')
      handleChange(filename, 'filename')
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
            verified={nft.category ? true : false}
            error={missing.includes('category')}
          />
        </Label>
        <DropDownCategory
          name="category"
          label={t('chooseCategory')}
          options={CATEGORIES}
          value={nft.category}
          onChange={handleChange}
          width="30vw"
          showLabel={true}
          selectIcon={true}
        />
      </DropDown>

      <InputFile
        name="dataHash"
        label={t('uploadNFT')}
        value={nft.dataHash}
        onChange={(e: any) => {
          if (e.target.files[0] === null) {
            setFilename('')
            handleChange('', 'dataHash')
            handleChange('', 'filename')
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
