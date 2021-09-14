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
import { useDepositStackState, useGetStakeAllowance, useStakeBalance, useUserAddress } from 'state/user/hooks'
import { useDeposit, useGetReserves } from 'hooks/startfiStakes'
import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import { useSTFIBalance } from 'hooks/useSTFIBalance'

import { LoadingIcon } from 'components/WaitingConfirmation/styles'
import Loading from './../../assets/icons/buttonloader.svg'

const StakeToken = () => {
  const { t } = useTranslation()
  const [cancelState, setCancelState] = useState<boolean>(false)
  const [value, setValue] = useState(0)
  const usd = useSTFItoUSD(value)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [waitingConfirmation, setWaitingConfirmation] = useState<boolean>(false)
  const depositStackState = useDepositStackState()

  const [loader, setLoader] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>(t('allow'))
  const [step, setStep] = useState<number>(1)
  const popup = usePopup()

  const approveToken = useApproveToken()
  const { allowStaking, allowedAmount } = useGetStakeAllowance()

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
    if (owner) {
      getReserves(owner)
    }
  }, [owner])

  const next = () => {
    switch (step) {
      case 1:
        setLoader(true)
        if (owner) {
          if (!allowStaking || value > allowedAmount) {
            approveToken(STARTFI_STAKES_ADDRESSS, value)
              .then(res => {
                setLoader(false)
                setButtonText(t('increaseStake'))
                setStep(2)
              })
              .catch(e => {
                popup({ success: false, message: e.code === 4001 ? t('userRejectTransaction') : t('error') })
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
              getReserves(owner)
              setWaitingConfirmation(false)
              setOpenModal(false)
              setSuccessModal(true)
              setLoader(false)
              setDisabled(true)
              setValue(0)
              setButtonText(t('allow'))
              setStep(1)
            })
            .catch(e => {
              popup({ success: false, message: e?.code === 4001 ? t('userRejectTransaction') : t('error') })
              setWaitingConfirmation(false)
              setSuccessModal(false)
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
      <Card height={cancelState ? '600px' : '221px'} border="1px solid #F4F4F4" borderRadius="6px" marginTop="20px">
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

        <StakeTokenSuccess
          isOpen={successModal}
          close={closeSuccess}
          waitingConfirmation={waitingConfirmation}
        ></StakeTokenSuccess>

        <Card
          margin="0px 30px 0px 43px"
          height={cancelState ? '431px' : '96px'}
          background="#FBFBFB"
          borderRadius="6px"
          alignItems="start"
          flexDirection="column"
        >
          <Text fontFamily="Roboto" FontWeight="500" fontSize="1rem" color="#000000" margin="-30px 0 3px 8px">
            {t('stakeTokens')}
          </Text>
          {!successModal && depositStackState ? (
            <React.Fragment>
              <Text
                fontFamily="Roboto"
                FontWeight="500"
                fontSize="0.8rem"
                color="#ff0000"
                margin="20px auto -10px auto"
              >
                {t('processingIncreaseStake')}
              </Text>

              <LoadingIcon
                position="absolute"
                left="58%"
                top="40.5%"
                width="15px"
                height="15px"
                src={Loading}
                alt="Loading"
              />
            </React.Fragment>
          ) : null}

          <BalanceContainer>
            <div>
              <Text fontFamily="Roboto" fontSize="1rem" color="#444444" margin="0 178px 3px 30px">
                {t('Balance')}
              </Text>
              <Text FontWeight="500">
                {ownerStakes} {t('stake')}
              </Text>
            </div>

            <DelistButton
              backgroundColor="transparent"
              padding="15px"
              textDecoration="underline"
              fontSize="1rem"
              color={cancelState ? '#747474' : '#000000'}
              margin="0 30px 0 0"
              disabledColor="#c2c2c2"
              disabled={depositStackState}
              onClick={() =>
                owner ? setCancelState(!cancelState) : popup({ success: false, message: t('connectWallet') })
              }
            >
              {cancelState ? t('cancel') : t('IncreaseStakes')}
            </DelistButton>
          </BalanceContainer>

          {cancelState ? (
            <React.Fragment>
              <BalanceContainer>
                <div>
                  <Text fontFamily="Roboto" fontSize="1rem" color="#444444" margin="0 178px 3px 30px">
                    {t('enterAmount')}
                  </Text>
                  <InputContainer>
                    <STFI>STFI</STFI>
                    <Input type="number" value={value} onChange={(e: any) => setValue(e.target.value)} />
                    <USD>
                      <USDPrice type="number" value={usd} />
                      <USDWord>USD</USDWord>
                    </USD>
                  </InputContainer>
                </div>
              </BalanceContainer>
              <StokeTokenFooter left={disabled ? '15px' : '26px'}>
                <CheckContainer>
                  <input type="checkbox" onChange={handelCheckBoxChanges} />
                  <Text fontFamily="Roboto" fontSize="0.875rem" FontWeight="500" color="#525252" margin="0 10px 0 0">
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
