import React, { useEffect, useState } from 'react'
import Text from '../Text'
import Card from 'components/Card'
import { BalanceContainer, InputContainer, StokeTokenFooter } from './StakeToken.styles'
import { CheckContainer, DelistButton } from 'components/DelistCard/DelistCard.style'
import { useTranslation } from 'react-i18next'

import { STFI, USD, USDPrice, USDWord, Input } from 'components/BidOrBuy/styles'
import { ButtonMint } from 'components/Button'

import { useApproveToken } from 'hooks/startfiToken'
import { address as STARTFI_STAKES_ADDRESSS } from '../../constants/abis/StartfiStakes.json'


import { usePopup } from 'state/application/hooks'
import StakeTokenCard from 'components/stakeTokenCard/StakeTokenCard'
import StakeTokenSuccess from './StakeTokenSuccess'
import { useUserAddress } from 'state/user/hooks'
import { useDeposit, useGetReserves } from 'hooks/startfiStakes'
import { useSTFItoUSD } from 'hooks/useSTFItoUSD'


const StakeToken = () => {
  const { t } = useTranslation()
  const [cancelState, setCancelState] = useState<boolean>(true)
  const [value, setValue] = useState(0)
  const usd = useSTFItoUSD(value)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Allow')
  const approveToken = useApproveToken()
  const [step, setStep] = useState<number>(1)
  const popup = usePopup()


  const [ownerStakes, setOwnerStakes] = useState<number>(0)

  const owner = useUserAddress()
  const getReserves = useGetReserves()

  const depositStake = useDeposit()

  const handelCheckBoxChanges = e => {
    setDisabled(!e.target.checked)
  }
  const closeCard = () => {
    setOpenModal(false)
  }
  const closeSuccess = () => {
    setSuccessModal(false)
  }

  useEffect(()=>{
    const getReserve = async () => {
      if (owner) {
        const stakes = await getReserves(owner)
        setOwnerStakes(parseInt(stakes, 16))
      }
    }
    getReserve()

  },[owner,successModal])

  const next = () => {
    switch (step) {
      case 1:
        setLoader(true)
        if (owner) {
          approveToken(STARTFI_STAKES_ADDRESSS, value).then(res => {

            setLoader(false)
            setButtonText('Increase Stake Balance')
            setStep(2)
          })
        }

        break
      case 2:
        // popup({ success: true, message: 'noNFT' })
        setLoader(true)
        if (owner) {
          depositStake(owner, value).then(res => {
            setOpenModal(false)
            setSuccessModal(true)
            setLoader(false)
          })
        }
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
        increasedStake={value}
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
            <Text>{ownerStakes}</Text>
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
                    <USDPrice type='number' value={usd} onChange={() => {}} />
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
