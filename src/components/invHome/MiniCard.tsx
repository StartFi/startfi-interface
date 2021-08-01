import { useCheckIfImage } from 'hooks/checkImage'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NFT } from 'services/models/NFT'
import uriToHttp from 'utils/uriToHttp'
import Text from '../Text'
import { CardContent, MiniInvCard, TagContainer, TextContainer, Image } from './InvHome.styles'
import NoImage from '../../assets/images/no-image-icon-23483.png'


interface MiniCardContent {
  cardContent: NFT
  navigate: () => void
}
const MiniCard: React.FC<MiniCardContent> = ({ cardContent, navigate }) => {
  const { t } = useTranslation()
  let tags: string[] = []
  if (cardContent?.tags) tags = [...cardContent?.tags].splice(0, 2)
  const imgUrl=uriToHttp(`${cardContent.dataHash}`)[1]
  const checkImage=useCheckIfImage(cardContent?.filename)


  return (
    <MiniInvCard onClick={navigate}>
      <CardContent>
        {checkImage?(<Image src={imgUrl}></Image>):<Image src={NoImage}></Image>}
    
        <TextContainer>
          <Text fontFamily='Roboto' fontSize='1rem' color='#000000' margin='-1px 0'>
            {cardContent?.name ? cardContent.name : t('noData')}
          </Text>
          <Text fontFamily='Roboto' fontSize='0.75rem' color='#000000' margin='-1px 0'>
            {cardContent?.description ? cardContent.description : t('noData')}
          </Text>
          <TagContainer lastChildWidth='69px'>
            {tags?.map(e => (
              <div key={e}>{e}</div>
            ))}
          </TagContainer>
        </TextContainer>
      </CardContent>
    </MiniInvCard>
  )
}

export default MiniCard
