import { ButtonTransparentBorder } from 'components/NFTConfirm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWishlist } from 'state/user/hooks'
import { NftButton } from '.'
import Path from '../../assets/svg/Path.svg'

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
        <img src={Path} alt="Add to Wishlist" />
        <button disabled={isWishlist} onClick={() => addToWishlist()}>
          {t('wishlist')}
        </button>
      </React.Fragment>
    )

  if (type === 'NFTCard')
    return (
      <NftButton disabled={isWishlist} onClick={() => addToWishlist()} color="#000000">
        {t('whishList')}
      </NftButton>
    )

  if (type === 'NFTConfirm')
    return <ButtonTransparentBorder disabled={isWishlist} onClick={() => addToWishlist()}>{t('addToWishlist')}</ButtonTransparentBorder>

  return null
}

export default ButtonWishlist
