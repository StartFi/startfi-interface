import React from 'react'
import { SidePadding, WalletConfirmationContainer, WhiteShadow } from 'components/WaitingConfirmation/styles'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Check from './../../assets/icons/check.svg'
import { SemiBold } from 'components/NFTConfirm/styles'
import { useClearNFT, useNFT } from 'state/marketplace/hooks'
import { MintedBorder, CheckIcon, MintedButtonBlack, MintedButtonWhite } from '../MintCard.tsx/styles'

const Minted: React.FC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const nft = useNFT()

  const clearNFT = useClearNFT()

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
        <MintedButtonBlack onClick={() => history.push('/mint/steps')}>
          {t('addAssetToMarketplace')}
        </MintedButtonBlack>
        <MintedButtonWhite
          onClick={() => {
            clearNFT()
            history.push('/inventory/home/offMarketPlace')
          }}
        >
          {t('seeInInventory')}
        </MintedButtonWhite>
      </WalletConfirmationContainer>{' '}
    </React.Fragment>
  )
}

export default Minted
