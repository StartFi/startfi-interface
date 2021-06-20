import { ImageIcon, WhishList } from 'components/NFTcard/nftcard.styles'
import { ButtonTransparentBorder } from 'components/NFTConfirm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWishlist } from 'state/user/hooks'
import { NftButton } from '.'
import Heart from '../../assets/svg/Path.svg'

interface ButtonWishlistProps {
  nftId: number
  type: string
}

const ButtonWishlist: React.FC<ButtonWishlistProps> = ({ nftId, type }: ButtonWishlistProps) => {
  const { t } = useTranslation()

  const { addToWishlist, isWishlist } = useWishlist(nftId)

  if (type === 'NFTProduct')
    return (
      <React.Fragment>
        <img src={Heart} alt="Add to Wishlist" />
        <button disabled={isWishlist} onClick={() => addToWishlist()}>
          {t('wishlist')}
        </button>
      </React.Fragment>
    )

  if (type === 'NFTCard')
    return (
      <WhishList>
      <ImageIcon src={Heart}  $opacity={isWishlist}/>
      <NftButton disabled={isWishlist} onClick={() => addToWishlist()} color="#000000">
        {t('whishList')}
      </NftButton>
      </WhishList>
    )

  if (type === 'NFTConfirm')
    return <ButtonTransparentBorder disabled={isWishlist} onClick={() => addToWishlist()}>{t('addToWishlist')}</ButtonTransparentBorder>

  return null
}

export default ButtonWishlist
