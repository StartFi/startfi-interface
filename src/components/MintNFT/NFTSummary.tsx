import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePopup } from 'state/application/hooks'
import { useAddToMarketplace, useAuction, useMinted, useMintNFT, useNFT } from 'state/marketplace/hooks'
import uriToHttp from 'utils/uriToHttp'
import { Tag } from 'components/Tags'
import { ButtonDraft, ButtonMint } from 'components/Button'
import { useSaveDraft } from 'state/user/hooks'
import { address as STARTFI_TOKEN_ADDRESS } from '../../constants/abis/StartFiToken.json'
import { useGetAllowance } from 'hooks/startfiToken'
import {
  Bold,
  Border,
  ButtonBlack,
  ButtonTransparentBorder,
  MarginLeft,
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
  Tags,
  PaymentModal,
  Royalty,
  Approx
} from './NFTSummary.styles'
import { WhiteShadow } from 'components/WaitingConfirmation'
import { useHistory } from 'react-router-dom'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { useApproveToken, useTokenBalance } from 'hooks/startfiToken'
import { useWeb3React } from '@web3-react/core'

const NFTSummary: React.FC = () => {
  const { account } = useWeb3React()
  const getStfiBalance = useTokenBalance()
  const getAllowedStfi = useGetAllowance()
  const approveToken = useApproveToken()

  const [allowedStfi, setAllowedStfi] = useState(0)
  const [stfiBalance, setStfiBalance] = useState(0)
  useEffect(() => {
    const getBalance = async () => {
      const balanceHexString = await getStfiBalance(account as string)
      const balance = balanceHexString?.length < 5 ? parseInt(balanceHexString, 16) : Number(balanceHexString)
      setStfiBalance(balance)
    }
    account && getBalance()
  }, [account, getStfiBalance])
  useEffect(() => {
    const getAllowed = async () => {
      const allowedHexString = await getAllowedStfi(account as string, STARTFI_NFT_PAYMENT_ADDRESS)
      console.log({ allowedHexString })
      const allowed = allowedHexString?.length < 5 ? parseInt(allowedHexString, 16) : allowedHexString
      setAllowedStfi(allowed)
    }
    account && getAllowed()
  }, [account, getAllowedStfi])
  const history = useHistory()

  const nft = useNFT()

  const auction = useAuction()

  const { t } = useTranslation()
  const popup = usePopup()

  const saveDraft = useSaveDraft()

  const [step, setStep] = useState<number>(auction ? 8 : 4)

  const fees = useDigitizingFees()

  const mint = useMintNFT()

  const addToMarketplace = useAddToMarketplace()

  const [agree, setAgree] = useState<boolean>(false)

  const minted = useMinted()

  if (!nft) return null

  const next = async () => {
    switch (step) {
      case 4:
        if (agree) {
          if (allowedStfi) {
            setStep(step + 2)
          } else {
            setStep(step + 1)
          }
        }
        return null
      case 5:
        console.log({ allowedStfi })
        const result = await approveToken(STARTFI_NFT_PAYMENT_ADDRESS, 5)
        if (result.hash) {
          return setStep(step + 1)
        }
        return null
      case 6:
        return mint()
      case 8:
        return setStep(step + 1)
      case 9:
        return setStep(step + 1)
      case 10:
        return addToMarketplace()
      default:
    }
  }

  const Nft = () => (
    <React.Fragment>
      <EditableBox editable={step === 4} link="/mint/steps" state={{ step: 1 }}>
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
              <FirstBoxData>{nft?.name}</FirstBoxData>
            </Field>
          </FirstBoxFields>
        </FirstField>
      </EditableBox>
      <EditableBox editable={step === 4} link="/mint/steps" state={{ step: 2 }}>
        <Field>
          <Label>{t('assetName')}</Label>
          <Data500>{nft?.dataHash}</Data500>
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
      <EditableBox editable={step === 4} link="/mint/steps" state={{ step: 3 }}>
        <Field>
          <Label>{t(step < 7 ? 'royaltyOption' : 'issuerRoyaltyShare')}</Label>
          <Royalty>
            <span>{nft.royalty}%</span>
            {step < 7 ? (
              t('forEachResell')
            ) : (
              <Royalty>
                <Approx>~</Approx> ( <Amount amount={(nft.royalty / 100) * (auction?.listingPrice || 0)} /> ){' '}
              </Royalty>
            )}
          </Royalty>
        </Field>
      </EditableBox>
    </React.Fragment>
  )

  const openFor = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const years = date.getFullYear() - now.getFullYear()
    const months = date.getMonth() - now.getMonth()
    const days = date.getDate() - now.getDate()
    var string = ''
    if (days) string += days + ' days'
    if (months) string += months + ' months'
    if (years) string += years + ' years'
    if (days < 0) return '0 days'
    return string
  }

  const Auction = () => {
    if (!auction) return null
    return (
      <React.Fragment>
        <EditableBox editable={step === 8} link="/mint/steps" state={{ step: 7 }}>
          <Field>
            <Label>{t('pricing')}</Label>
            <Data>
              <Amount amount={auction.listingPrice} />
            </Data>
          </Field>
          <Line />
          <Field>
            <Label>{t('minimumBidding')}</Label>
            <Data>
              <Amount amount={auction.minBid || 0} />
            </Data>
          </Field>
          <Line />
          <Field>
            <Label>{t('auctionTime')}</Label>
            <Data>
              {t('openedFor')} {`${openFor(auction.expireTimestamp)}`}
            </Data>
          </Field>
          <Line />
          <Field>
            <Label>{t('qualifyAmount')}</Label>
            <Data>
              <Amount amount={auction.qualifyAmount || 0} />
            </Data>
          </Field>
        </EditableBox>
        <EditableBox>
          <Field>
            <Label>{t('tokenId')}</Label>
            <Data>{nft.id}</Data>
          </Field>
          <Line />
          <Field>
            <Label>{t('contractAddressAttribute')}</Label>
            <Data></Data>
          </Field>
        </EditableBox>
      </React.Fragment>
    )
  }

  const ContainerFooter = () => (
    <Footer>
      {step === 4 && (
        <Radio>
          <img onClick={() => setAgree(!agree)} src={agree ? Checked : Unchecked} alt="Check" />
          <RadioLabel>{t('confirmNFTData')}</RadioLabel>
        </Radio>
      )}
      <Buttons>
        <ButtonDraft
          onClick={() =>
            nft.step < 4
              ? nft.category || nft.dataHash || nft.name || nft.description
                ? saveDraft(nft)
                : popup({ success: false, message: 'No data entered to save' })
              : history.push('/inventory/off-market/' + nft.id)
          }
        >
          {t(step === 4 ? 'saveDraft' : 'saveAtOffMarketplace')}
        </ButtonDraft>
        <ButtonMint disabled={!agree && step === 4} onClick={next}>
          {t(step === 4 ? 'next' : 'addToMarketplace')}
        </ButtonMint>
      </Buttons>
    </Footer>
  )

 const PaymentCard = () => (
    <Right minHeight="60vh">
      <Bold>{t('confirmPayment')}</Bold>
      <SpaceBetween>
        <SemiBold>{t('digitizingFees')}</SemiBold>
        <Amount amount={fees} />
      </SpaceBetween>
      <Border />
      <SpaceBetween>
        <SemiBold>{t('yourBalance')}</SemiBold>
        <Amount amount={stfiBalance} />
      </SpaceBetween>
      <Border />
      <SpaceBetween>
        <SemiBold>{t('totalPaymentAmount')}</SemiBold>
        <Amount amount={fees} />
      </SpaceBetween>
      <Info>
        {t(step === 5 || step === 9 ? 'payFromYourAccount' : 'paymentAllowedDigitize')}
        {(step === 5 || step === 9) && <Question text="payFromAccountDesc" />}
      </Info>
      <ButtonBlack onClick={next}>
        {t(step === 6 ? 'saveToBlockchain' : step === 10 || allowedStfi !== 0 ? 'addToMarketplace' : 'allowPayment')}{' '}
      </ButtonBlack>
      <ButtonTransparentBorder
        onClick={() => (nft.step < 4 ? saveDraft(nft) : history.push('/inventory/off-market/' + nft.id))}
      >
        {t('cancelAndSaveAsDraft')}
      </ButtonTransparentBorder>
    </Right>
  )

  return (
    <Container>
      {(step === 9 || step === 10) && (
        <React.Fragment>
          <WhiteShadow />
          <PaymentModal>
            <PaymentCard />
          </PaymentModal>
        </React.Fragment>
      )}
      {minted && <Minted />}
      <Prepare>
        {t(step === 4 ? 'prepareNFT' : step === 8 ? 'monetizingYourAssets' : 'digitizeAsset')}
        {(step === 5 || step === 6) && <Question text="digitizeAssetDesc" tooltipWidth="40vw" />}
      </Prepare>
      <Card>
        <Name>{nft.name}</Name>
        <Columns>
          <Left>
            <Nft />
            <Auction />
            {(step === 4 || step === 8) && <ContainerFooter />}
          </Left>
          {(step === 5 || step === 6) && (
            <MarginLeft>
              <PaymentCard />
            </MarginLeft>
          )}
        </Columns>
      </Card>
    </Container>
  )
}

export default NFTSummary
