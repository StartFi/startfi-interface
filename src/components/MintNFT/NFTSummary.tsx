import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { usePopup } from 'state/application/hooks'
import { useMinted, useMintNFT, useNFT } from 'state/marketplace/hooks'
import uriToHttp from 'utils/uriToHttp'
import { Tag } from 'components/Tags'
import { ButtonDraft, ButtonMint } from 'components/Button'
import { useSaveDraft, useUserBalance } from 'state/user/hooks'
import {
  Bold,
  Border,
  ButtonBlack,
  ButtonTransparentBorder,
  Right,
  SemiBold,
  SpaceBetween
} from 'components/NFTConfirm'
import { useDigitizingFees } from 'hooks'
import Checked from './../../assets/icons/checked.svg'
import Unchecked from './../../assets/icons/unchecked.svg'
import Question from 'components/Input/Question'
import EditableBox from './EditableBox'
import Minted from './Minted'
import Amount from './Amount'
import {
  Container,
  DataWidth,
  Label,
  Buttons,
  Card,
  Columns,
  Data,
  Data500,
  Field,
  FirstBoxData,
  FirstBoxFields,
  FirstBoxLabel,
  FirstField,
  Footer,
  Img,
  Info,
  Left,
  Line,
  Name,
  Prepare,
  Radio,
  RadioLabel,
  Tags
} from './NFTSummary.styles'

const NFTSummary: React.FC = () => {
  const nft = useNFT()

  const { t } = useTranslation()

  const popup = usePopup()

  const history = useHistory()

  const saveDraft = useSaveDraft()

  const [step, setStep] = useState<number>(4)

  const fees = useDigitizingFees()

  const balance = parseFloat(useUserBalance() || '')

  const mint = useMintNFT()

  const [agree, setAgree] = useState<boolean>(false)

  const minted = useMinted()

  if (!nft || !balance) {
    popup({ success: false, message: 'No nft or user found' })
    history.goBack()
    return null
  }

  const next = () => {
    switch (step) {
      case 4:
        return agree ? setStep(step + 1) : null
      case 5:
        return setStep(step + 1)
      case 6:
        return mint()
      default:
    }
  }

  return (
    <Container>
      {minted && <Minted />}
      <Prepare>
        {t(step === 4 ? 'prepareNFT' : 'digitizeAsset')}
        {step !== 4 && <Question text="digitizeAssetDesc" tooltipWidth="40vw" />}
      </Prepare>
      <Card>
        <Name>{nft.name}</Name>
        <Columns>
          <Left>
            <EditableBox editable={step === 4} link="/mint/steps" state={{ step: 1 }}>
              <FirstField>
                <Img src={uriToHttp(nft.dataHash)[1]} alt="NFT" />
                <FirstBoxFields>
                  <Field>
                    <FirstBoxLabel>Category</FirstBoxLabel>
                    <FirstBoxData>{nft.category}</FirstBoxData>
                  </Field>
                  <Line />
                  <Field>
                    <FirstBoxLabel>Uploaded File</FirstBoxLabel>
                    <FirstBoxData>{nft.name}</FirstBoxData>
                  </Field>
                </FirstBoxFields>
              </FirstField>
            </EditableBox>
            <EditableBox editable={step === 4} link="/mint/steps" state={{ step: 2 }}>
              <Field>
                <Label>Asset Name</Label>
                <Data500>{nft.dataHash}</Data500>
              </Field>
              <Line />
              <Field>
                <Label>Related Tags</Label>
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
                <Label>Description</Label>
                <DataWidth>{nft.description}</DataWidth>
              </Field>
            </EditableBox>
            <EditableBox editable={step === 4} link="/mint/steps" state={{ step: 3 }}>
              <Field>
                <Label>Royalty Option</Label>
                <Data>{nft.royalty} % for Each resell</Data>
              </Field>
            </EditableBox>
            {step === 4 && (
              <Footer>
                <Radio>
                  <img onClick={() => setAgree(!agree)} src={agree ? Checked : Unchecked} alt="Check" />
                  <RadioLabel>{t('confirmNFTData')}</RadioLabel>
                </Radio>
                <Buttons>
                  <ButtonDraft
                    onClick={() =>
                      nft.category || nft.dataHash || nft.name || nft.description
                        ? saveDraft(nft)
                        : popup({ success: false, message: 'No data entered to save' })
                    }
                  >
                    {t('saveDraft')}
                  </ButtonDraft>
                  <ButtonMint disabled={!agree} onClick={next}>
                    Next
                  </ButtonMint>
                </Buttons>
              </Footer>
            )}
          </Left>
          {(step === 5 || step === 6) && (
            <Right minHeight="60vh">
              <Bold>{t('confirmPayment')}</Bold>
              <SpaceBetween>
                <SemiBold>{t('digitizingFees')}</SemiBold>
                <Amount amount={fees} />
              </SpaceBetween>
              <Border />
              <SpaceBetween>
                <SemiBold>{t('yourBalance')}</SemiBold>
                <Amount amount={balance} />
              </SpaceBetween>
              <Border />
              <SpaceBetween>
                <SemiBold>{t('totalPaymentAmount')}</SemiBold>
                <Amount amount={fees} />
              </SpaceBetween>
              <Info>
                {t(step === 5 ? 'payFromYourAccount' : 'paymentAllowedDigitize')}
                {step === 5 && <Question text="payFromAccountDesc" />}
              </Info>
              <ButtonBlack onClick={next}>{t(step === 5 ? 'allowPayment' : 'saveToBlockchain')}</ButtonBlack>
              <ButtonTransparentBorder onClick={() => saveDraft(nft)}>
                {t('cancelAndSaveAsDraft')}
              </ButtonTransparentBorder>
            </Right>
          )}
        </Columns>
      </Card>
    </Container>
  )
}

export default NFTSummary
