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
import { useGetStakeAllowance, useStakeBalance, useUserAddress } from 'state/user/hooks'
import { useDeposit, useGetReserves } from 'hooks/startfiStakes'
import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import { useSTFIBalance } from 'hooks/useSTFIBalance'



const StakeToken = () => {
  const { t } = useTranslation()
  const [cancelState, setCancelState] = useState<boolean>(false)
  const [value, setValue] = useState(0)
  const usd = useSTFItoUSD(value)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [waitingConfirmation, setWaitingConfirmation] = useState<boolean>(false)

  const [loader, setLoader] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>(t('allow'))
  const [step, setStep] = useState<number>(1)
  const popup = usePopup()




  const approveToken = useApproveToken()
  const { allowStaking, allowedAmount } = useGetStakeAllowance()
  const [askApproval, setAskApproval] = useState<boolean>(true)

  const owner = useUserAddress()
  const getReserves = useGetReserves()
  const ownerStakes = useStakeBalance()
  const depositStake = useDeposit()

  const STFIBalance = useSTFIBalance()
  const stakeAfterIncreased = parseInt(value.toString()) + ownerStakes
  const STFIBalanceAfterStack = STFIBalance - value

  const handelCheckBoxChanges = e => {
    setDisabled(!e.target.checked)
  }
  const closeCard = () => {
    setOpenModal(false)
  }
  const closeSuccess = () => {
    setSuccessModal(false)
    setCancelState(false)
  }

  useEffect(() => {
    setAskApproval(allowStaking)
    // updatedStack()

    console.log('value=>', value)

    if (cancelState) {
      // setValue(0)
      // setOwnerStakes(stakeAfterIncreased)
    }

    // if (askApproval) {
    //   setButtonText(t('allow'))
    // } else {
    //   setButtonText(t('increaseStake'))
    // }

    return () => {}
  }, [ownerStakes, cancelState, owner, allowStaking,step,])

  const next = async () => {
    switch (step) {
      case 1:
        setLoader(true)
        if (owner) {
          if (askApproval) {
            approveToken(STARTFI_STAKES_ADDRESSS, value)
              .then(res => {
                setLoader(false)
                setButtonText(t('increaseStake'))
                setStep(2)
              })
              .catch(e => {
                popup({ success: false, message: 'Error Ocurred' })
                setLoader(false)
                setCancelState(false)
                setOpenModal(false)
              })
          } else {
            setLoader(false)
            setButtonText(t('increaseStake'))
            setStep(2)
          }
        }

        break
      case 2:
        closeCard()
        setSuccessModal(true)
        setWaitingConfirmation(true)
        if (owner) {
         depositStake(owner, value)

          .then(res => {
            console.log('deposit Token',res)
            getReserves(owner)
            setWaitingConfirmation(false)
            setOpenModal(false)
            setSuccessModal(true)
            setLoader(false)
            setStep(1)
          })
          .catch(e => {
            popup({ success: false, message: 'Error Ocurred' })
            setLoader(false)
            setCancelState(false)
            setOpenModal(false)
          })
        }
        break
    }
  }

  return (
    <React.Fragment>
      <Card height={cancelState ? '600px' : '221px'} border='1px solid #F4F4F4' borderRadius='6px' marginTop='20px'>
        <StakeTokenCard
          isOpen={openModal}
          close={closeCard}
          loader={loader}
          buttonText={buttonText}
          next={next}
          increasedStake={value}
          stakeAfterIncreased={stakeAfterIncreased}
          stfiBalanceAfterStack={STFIBalanceAfterStack}
        ></StakeTokenCard>

        <StakeTokenSuccess isOpen={successModal} close={closeSuccess} waitingConfirmation={waitingConfirmation}></StakeTokenSuccess>

        <Card
          margin='0px 30px 0px 43px'
          height={cancelState ? '431px' : '96px'}
          background='#FBFBFB'
          borderRadius='6px'
          alignItems='start'
          flexDirection='column'
        >
          <Text fontFamily='Roboto' FontWeight='500' fontSize='1rem' color='#000000' margin='-30px 0 3px 8px'>
            Stake Tokens
          </Text>
          <BalanceContainer>
            <div>
              <Text fontFamily='Roboto' fontSize='1rem' color='#444444' margin='0 178px 3px 30px'>
                {t('Balance')}
              </Text>
              <Text FontWeight='500'>
                {ownerStakes} {t('stake')}
              </Text>
            </div>
            <DelistButton
              backgroundColor='transparent'
              padding='15px'
              textDecoration='underline'
              fontSize='1rem'
              color={cancelState ? '#747474' : '#000000'}
              margin='0 30px 0 0'
              onClick={() =>
                owner ? setCancelState(!cancelState) : popup({ success: false, message: 'You Are Not Connected' })
              }
            >
              {cancelState ? t('cancel') : t('IncreaseStakes')}
            </DelistButton>
          </BalanceContainer>

          {cancelState ? (
            <React.Fragment>
              {/* <Text
                fontFamily='Roboto'
                fontSize='1rem'
                color='#444444'
                margin='10px 178px 3px 30px'
                marginLeft='150px'
                spanWeight='600'
              >
                AllowedAmount :<span> {allowedAmount}</span>
              </Text> */}

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
                    {disabled ? t('increaseBalance') : t('confirmIncreasing')}
                  </ButtonMint>
                </CheckContainer>
              </StokeTokenFooter>
            </React.Fragment>
          ) : null}
        </Card>
      </Card>
    </React.Fragment>
  )
}

export default StakeToken
