// import Amount from 'components/MintNFT/Amount'
// import { Bold, Border, SemiBold, SpaceBetween,ButtonBlack, ButtonTransparentBorder} from 'components/NFTConfirm'
import { Divider } from 'components/InMarketAsset/InMarket.styles'
import React from 'react'
import { NFT } from 'services/models/NFT'
// import { useTranslation } from 'react-i18next'
import { PaymentModal, Container,Shadow, DelistCardHeader} from './DelistCard.style'
import Text from '../Text'
// import Question from 'components/Input/Question'
// import { useDigitizingFees } from 'hooks'
// import { useWeb3React } from '@web3-react/core'
// import { useTokenBalance } from 'hooks/startfiToken'
interface PaymentCardProps {
    isOpen: boolean
    close: () => void
    nft:NFT
  }


const DelistCard: React.FC<PaymentCardProps> = ({isOpen,close,nft}) => {


  if (!isOpen) return null
  return (
    <React.Fragment>
    <Shadow onClick={close} />
    <PaymentModal>
    <Container minHeight='70vh'>

      <DelistCardHeader>
        <Text  fontFamily='Roboto' fontSize='1.2rem' color='#000000'  font-weight="500" margin="5px 0px 15px 0px">Delisting Asset "{nft?.name}"</Text>
        <Divider left="-8.5%" width="116.5%" backgroundColor="#D1D1D1"></Divider>

      </DelistCardHeader>


      </Container>
    </PaymentModal>
    </React.Fragment>
  )
}

export default DelistCard;
