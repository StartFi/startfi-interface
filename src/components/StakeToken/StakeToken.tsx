import React, { useState } from 'react'
import Text from '../Text'
import Card from 'components/Card'
import { BalanceContainer } from './StakeToken.styles'
import { DelistButton } from 'components/DelistCard/DelistCard.style'
import { useTranslation } from 'react-i18next'

const StakeToken = () => {
  const { t } = useTranslation()
  const [cancelState,setCancelState]=useState<boolean>(false)
  const [cardHeight,setCardHeight]=useState<string>('96px')
  return (
    <Card height='221px' border='1px solid #F4F4F4' borderRadius='6px' marginTop='20px'>
      <Card margin='0px 30px 0px 43px' height={cardHeight} background='#FBFBFB' borderRadius='6px'>
        <BalanceContainer>
          <div>
            <Text fontFamily='Roboto' FontWeight='500' fontSize='1rem' color='#000000' margin='0 0 3px 30px'>
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
          >
            {t('IncreaseStakes')}
          </DelistButton>
        </BalanceContainer>
      </Card>
    </Card>
  )
}

export default StakeToken
