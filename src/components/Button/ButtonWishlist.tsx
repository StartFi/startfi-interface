import { ImageIcon, WhishList } from 'components/NFTcard/nftcard.styles'
import { ButtonTransparentBorder } from 'components/NFTConfirm/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWishlist } from 'state/user/hooks'
import { NftButton } from '.'
import Heart from '../../assets/svg/Path.svg'
import RemoveWish from '../../assets/images/removeWish.png'

interface ButtonWishlistProps {
  nftId: number
  type: string
  width?:string
  borderRadius?:string
  fontSize?:string
}

const ButtonWishlist: React.FC<ButtonWishlistProps> = ({ nftId, type,width,borderRadius,fontSize}: ButtonWishlistProps) => {
  const { t } = useTranslation()

  const { addToWishlist, removeFromWishlist, isWishlist } = useWishlist(nftId)

  if (type === 'NFTProduct')
    return (


        <WhishList background={isWishlist ? '#878787' : '#ededed'} width={width} borderRadius={borderRadius}>
          <ImageIcon src={isWishlist ? RemoveWish : Heart} $opacity={isWishlist} />
          <NftButton
            onClick={() => (isWishlist ? removeFromWishlist() : addToWishlist())}
            color={isWishlist ? '#ffffff' : '#000000'}
            fontSize={fontSize}
          >
            {t(isWishlist ? 'removeFromWishlist' : 'whishList')}
          </NftButton>
        </WhishList>

    )

  if (type === 'NFTCard')
    return (
      <WhishList background={isWishlist ? '#878787' : '#ededed'}>
        <ImageIcon src={isWishlist ? RemoveWish : Heart} $opacity={isWishlist} />
        <NftButton
          onClick={() => (isWishlist ? removeFromWishlist() : addToWishlist())}
          color={isWishlist ? '#ffffff' : '#000000'}

        >
          {t(isWishlist ? 'removeFromWishlist' : 'whishList')}
        </NftButton>
      </WhishList>
    )

  if (type === 'NFTConfirm')
    return (
      <ButtonTransparentBorder onClick={() => (isWishlist ? removeFromWishlist() : addToWishlist())}
      color={isWishlist ? '#ffffff' : '#000000'}
      backgroundColor={isWishlist ? '#878787' : '#ffffff'}
      border={isWishlist ?"none":""}

      >
        {t(isWishlist ? 'removeFromWishlist' : 'addToWishlist')}
      </ButtonTransparentBorder>
    )

  return null
}

export default ButtonWishlist
