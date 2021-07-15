import React from 'react'
import { SidePadding, WalletConfirmationContainer, WhiteShadow } from 'components/WaitingConfirmation'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Check from './../../assets/icons/check.svg'
import { ButtonBlack, SemiBold, ButtonTransparentBorder } from 'components/NFTConfirm'
import styled from 'styled-components'
import { useNFT } from 'state/marketplace/hooks'

const MintedBorder = styled.div`
  margin-top: 2vh;
  border: 1px solid #eeeeee;
  width: 100%;
`

const MintedButtonBlack = styled(ButtonBlack)`
  margin-top: 3vh;
  border-radius: 100px;
`

const MintedButtonWhite = styled(ButtonTransparentBorder)`
  margin-top: 3vh;
  border-radius: 100px;
`

const CheckIcon = styled.img`
  margin-right: 1vw;
`

const Minted: React.FC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const nft = useNFT()

  if (!nft) return null

  return (
    <React.Fragment>
      <WhiteShadow />
      <WalletConfirmationContainer>
        <SidePadding>
          <SemiBold>
            <CheckIcon src={Check} alt="Minted" />
            {t('nftMintedMonetize')}
          </SemiBold>
        </SidePadding>
        <MintedBorder />
        <MintedButtonBlack onClick={() => history.push('/mint/steps', { step: 7 })}>
          {t('addAssetToMarketplace')}
        </MintedButtonBlack>
        <MintedButtonWhite onClick={() => history.push('/inventory/off-market/' + nft.id)}>
          {t('seeInInventory')}
        </MintedButtonWhite>
      </WalletConfirmationContainer>{' '}
    </React.Fragment>
  )
}

export default Minted
