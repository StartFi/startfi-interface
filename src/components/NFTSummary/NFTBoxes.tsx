import React from 'react'
import EditableBox from 'components/NFTSummary/EditableBox'
import uriToHttp from 'utils/uriToHttp'
import { Tag } from 'components/Tags/styles'
import {
  DataWidth,
  Label,
  Data500,
  Field,
  FirstBoxData,
  FirstBoxFields,
  FirstBoxLabel,
  FirstField,
  Img,
  Line,
  Tags,
  Royalty,
  Approx
} from './styles'
import DisplayBalance  from './DisplayBalance'
import { useTranslation } from 'react-i18next'
import { useAuction, useNFT, useSteps } from 'state/marketplace/hooks'
import { STEP } from 'state/marketplace/types'

const NFTBoxes: React.FC = () => {
  const { t } = useTranslation()

  const nft = useNFT()

  const auction = useAuction()

  const { step, nftOrAuction } = useSteps()

  if (!nft) return null

  return (
    <React.Fragment>
      <EditableBox editable={step === STEP.NFT_SUMMARY} link="/mint/steps" step={STEP.STEP1}>
        <FirstField>
          <Img src={uriToHttp(nft.dataHash)[1]} alt="NFT" />
          <FirstBoxFields>
            <Field>
              <FirstBoxLabel>{t('category')}</FirstBoxLabel>
              <FirstBoxData>{nft?.category}</FirstBoxData>
            </Field>
            <Line />
            <Field>
              <FirstBoxLabel>{t('uploadedFile')}</FirstBoxLabel>
              <FirstBoxData>{nft?.filename}</FirstBoxData>
            </Field>
          </FirstBoxFields>
        </FirstField>
      </EditableBox>
      <EditableBox editable={step === STEP.NFT_SUMMARY} link="/mint/steps" step={STEP.STEP2}>
        <Field>
          <Label>{t('assetName')}</Label>
          <Data500>{nft?.name}</Data500>
        </Field>
        <Line />
        <Field>
          <Label>{t('relatedTags')}</Label>
          {nft.tags && (
            <Tags>
              {nft.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
          )}
        </Field>
        <Line />
        <Field>
          <Label>{t('description')}</Label>
          <DataWidth>{nft.description}</DataWidth>
        </Field>
      </EditableBox>
      <EditableBox editable={step === STEP.NFT_SUMMARY} link="/mint/steps" step={STEP.STEP3}>
        <Field>
          <Label>{t(nftOrAuction ? 'royaltyOption' : 'issuerRoyaltyShare')}</Label>
          <Royalty>
            <span>{nft.royalty}%</span>
            {nftOrAuction ? (
              t('forEachResell')
            ) : (
              <Royalty>
                <Approx>~</Approx> ( <DisplayBalance  amount={(nft.royalty / 100) * (auction?.listingPrice || 0)} /> ){' '}
              </Royalty>
            )}
          </Royalty>
        </Field>
      </EditableBox>
    </React.Fragment>
  )
}

export default NFTBoxes
