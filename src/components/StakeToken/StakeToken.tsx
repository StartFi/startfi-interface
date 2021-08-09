import React, { useState } from 'react'
import Text from '../Text'
import Card from 'components/Card'
import { BalanceContainer } from './StakeToken.styles'
import { DelistButton } from 'components/DelistCard/DelistCard.style'
import { useTranslation } from 'react-i18next'

import { STFI, USD, USDPrice, USDWord, InputContainer, Input } from 'components/BidOrBuy/styles'

const StakeToken = () => {
  const { t } = useTranslation()
  const [cancelState, setCancelState] = useState<boolean>(true)
  const [value, setValue] = useState(10)
  const usd = () => value * 10

  return (
    <Card height={cancelState ? '600px' : '221px'} border='1px solid #F4F4F4' borderRadius='6px' marginTop='20px'>
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
            <Text fontFamily='Roboto' FontWeight='500' fontSize='1rem' color='#000000' margin='0 178px 3px 30px'>
              {t('Balance')}
            </Text>
            <Text>25</Text>
          </div>
          <DelistButton
            backgroundColor='transparent'
            padding='15px'
            textDecoration='underline'
            fontWeight='500'
            fontSize='0.9rem'
            margin='0 30px 0 0'
            onClick={() => setCancelState(!cancelState)}
          >
            {cancelState ? t('cancel') : t('IncreaseStakes')}
          </DelistButton>
        </BalanceContainer>

        {cancelState ? (
          <BalanceContainer>
            <div>
              <Text fontFamily='Roboto' fontSize='1rem' color='#444444' margin='0 178px 3px 30px'>
                {t('enterAmount')}
              </Text>
              {/* <div> */}
                <InputContainer>
                  <STFI>STFI</STFI>
                  <Input type='number' value={value} onChange={(e: any) => setValue(e.target.value)} />
                  <USD>
                    <USDPrice type='number' value={usd()} onChange={() => {}} />
                    <USDWord>USD</USDWord>
                  </USD>
                </InputContainer>
              {/* </div> */}
            </div>
          </BalanceContainer>
        ) : null}
      </Card>
    </Card>
  )
}

export default StakeToken
