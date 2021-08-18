import React, { useState } from 'react'
import Text from '../Text'
import Card from 'components/Card'
import { BalanceContainer, InputContainer, StokeTokenFooter } from './StakeToken.styles'
import { CheckContainer, DelistButton } from 'components/DelistCard/DelistCard.style'
import { useTranslation } from 'react-i18next'

import { STFI, USD, USDPrice, USDWord, Input } from 'components/BidOrBuy/styles'
import { ButtonMint } from 'components/Button'

import { useApproveToken } from 'hooks/startfiToken'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'

import { useDigitizingFees } from 'hooks'
import { usePopup } from 'state/application/hooks'
import StakeTokenCard from 'components/stakeTokenCard/StakeTokenCard'
import StakeTokenSuccess from './StakeTokenSuccess'

const StakeToken = () => {
  const { t } = useTranslation()
  const [cancelState, setCancelState] = useState<boolean>(true)
  const [value, setValue] = useState(0)
  const usd = () => value * 10
  const [disabled, setDisabled] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Allow')
  const approveToken = useApproveToken()
  const fees = useDigitizingFees()
  const [step, setStep] = useState<number>(1)
  const popup = usePopup()

  const handelCheckBoxChanges = e => {
    setDisabled(!e.target.checked)
  }
  const closeCard = () => {
    setOpenModal(false)
  }
  const closeSuccess = () => {}

  const next = () => {
    switch (step) {
      case 1:
        setLoader(true)
        approveToken(STARTFI_NFT_PAYMENT_ADDRESS, fees).then(res => {
          setLoader(false)
          setButtonText('Increase Stake Balance')
          setStep(2)
        })
        break
      case 2:
        popup({ success: true, message: 'noNFT' })
        break
    }
  }

  return (
    <Card height={cancelState ? '600px' : '221px'} border='1px solid #F4F4F4' borderRadius='6px' marginTop='20px'>
      <StakeTokenCard
        isOpen={openModal}
        close={closeCard}
        loader={loader}
        buttonText={buttonText}
        next={next}
      ></StakeTokenCard>

      <StakeTokenSuccess isOpen={successModal} close={closeSuccess}></StakeTokenSuccess>
      <Card
        margin='0px 30px 0px 43px'
        height={cancelState ? '431px' : '96px'}
        background='#FBFBFB'
        borderRadius='6px'
        alignItems='start'
        flexDirection='column'
      >
        <BalanceContainer>
          <div>
            <Text fontFamily='Roboto' fontSize='1rem' color='#444444' margin='0 178px 3px 30px'>
              {t('Balance')}
            </Text>
            <Text>0</Text>
          </div>
          <DelistButton
            backgroundColor='transparent'
            padding='15px'
            textDecoration='underline'
            fontSize='1rem'
            color={cancelState ? '#747474' : '#000000'}
            margin='0 30px 0 0'
            onClick={() => setCancelState(!cancelState)}
          >
            {cancelState ? t('cancel') : t('IncreaseStakes')}
          </DelistButton>
        </BalanceContainer>

        {cancelState ? (
          <React.Fragment>
            <BalanceContainer>
              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' margin='0 178px 3px 30px'>
                  {t('enterAmount')}
                </Text>
                <InputContainer>
                  <STFI>STFI</STFI>
                  <Input type='number' value={value} onChange={(e: any) => setValue(e.target.value)} />
                  <USD>
                    <USDPrice type='number' value={usd()} onChange={() => {}} />
                    <USDWord>USD</USDWord>
                  </USD>
                </InputContainer>
              </div>
            </BalanceContainer>
            <StokeTokenFooter left={disabled ? '15px' : '26px'}>
              <CheckContainer>
                <input type='checkbox' onChange={handelCheckBoxChanges} />
                <Text fontFamily='Roboto' fontSize='0.875rem' FontWeight='500' color='#525252' margin='0 10px 0 0'>
                  {t('confirmIncStakeToken')}
                </Text>
                <ButtonMint onClick={() => setOpenModal(true)} disabled={disabled}>
                  {' '}
                  {disabled ? t('increaseBalance') : t('confirmIncreasing')}
                </ButtonMint>
              </CheckContainer>
            </StokeTokenFooter>
          </React.Fragment>
        ) : null}
      </Card>
    </Card>
  )
}

export default StakeToken
