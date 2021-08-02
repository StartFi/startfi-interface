import { ImageIcon, WhishList } from 'components/NFTcard/nftcard.styles'
import { ButtonTransparentBorder } from 'components/NFTConfirm/styles'
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

  const { addToWishlist, removeFromWishlist, isWishlist } = useWishlist(nftId)

  if (type === 'NFTProduct')
    return (
      <React.Fragment>
        <img src={Heart} alt="Add to Wishlist" />
        <button onClick={() => (isWishlist ? removeFromWishlist() : addToWishlist())}>
          {t(isWishlist ? 'removeFromWishlist' : 'whishList')}
        </button>
      </React.Fragment>
    )

  if (type === 'NFTCard')
    return (
      <WhishList>
        <ImageIcon src={Heart} $opacity={isWishlist} />
        <NftButton onClick={() => (isWishlist ? removeFromWishlist() : addToWishlist())} color="#000000">
          {t(isWishlist ? 'removeFromWishlist' : 'whishList')}
        </NftButton>
      </WhishList>
    )

  if (type === 'NFTConfirm')
    return (
      <ButtonTransparentBorder onClick={() => (isWishlist ? removeFromWishlist() : addToWishlist())}>
        {t(isWishlist ? 'removeFromWishlist' : 'addToWishlist')}
      </ButtonTransparentBorder>
    )

  return null
}

export default ButtonWishlist
