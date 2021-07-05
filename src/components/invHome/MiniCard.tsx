import React from 'react'
import { NFT } from 'services/models/NFT'
import styled from 'styled-components'
import uriToHttp from 'utils/uriToHttp'

import Text from '../Text'

const Card = styled.div`
  display: flex;
  width: 46.1%;
  height: 157px;
  margin: 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.5s;

  &:hover {
    flex-grow: 0;
    transform: scale(1.1);
  }
`

export const CardContent = styled.div`
  display: flex;
  margin: 26px 26px 28px 27px;
`
export const Image = styled.img`
  width: 128px;
  height: 103px;
  border-radius: 4px;
`
export const TextContainer = styled.div`
  display: flex;
  margin-left: 25px;
  flex-direction: column;
  justify-content: space-between;
`
const ButtonContainer = styled.div`
  display: flex;
  & button {
    width: 89px;
    height: 35px;
    margin-right: 10px;
    background: #f4f4f4;
    border-radius: 4px;
    outline: none;
    border: transparent;
  }
  & :last-child {
    width: 69px;
  }
`

interface MiniCardContent {
    cardContent: NFT


  navigate: () => void

}
const MiniCard: React.FC<MiniCardContent> = ({ cardContent ,navigate}) => {

  let tags: string[] = []
  if (cardContent?.tags) tags = [...cardContent?.tags].splice(0, 2)
  const imgUrl = uriToHttp(`${cardContent.image}`)[0]
  return (

    <Card onClick={navigate}>

      <CardContent>
        <Image src={imgUrl}></Image>
        <TextContainer>
          <Text fontFamily='Roboto' fontSize='1rem' color='#000000' margin='-1px 0'>
            {cardContent?.name ? cardContent.name : 'No Data Available'}
          </Text>
          <Text fontFamily='Roboto' fontSize='0.75rem' color='#000000' margin='-1px 0'>
            {cardContent?.description ? cardContent.description : 'No Data Available'}
          </Text>
          <ButtonContainer>
            {tags?.map(e => (
              <button key={e}>{e}</button>
            ))}
          </ButtonContainer>
        </TextContainer>
      </CardContent>
    </Card>
  )
}

export default MiniCard
