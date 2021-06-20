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
  &:hover {
    flex: 2;
    /* align-self: flex-start; */
    align-items: flex-start;

    zoom: 105%;
    transition: ease-in-out 0.3s all;
    z-index: 100;
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

interface MiniCardContent{
  cardContent: NFT
}
const MiniCard: React.FC<MiniCardContent>  = ({cardContent}) => {
  // console.log(usreDraftts)
  const imgUrl = uriToHttp(`${cardContent.image}`)[0]
  return (
    <Card>
      <CardContent>
        <Image src={imgUrl}></Image>
        <TextContainer>
          <Text fontFamily='Roboto' fontSize='1rem' color='#000000' margin='-1px 0'>
            {cardContent.name}
          </Text>
          <Text fontFamily='Roboto' fontSize='0.75rem' color='#000000' margin='-1px 0'>
           { cardContent.description}
          </Text>
          <ButtonContainer>
            <button>Starbuks</button>
            <button>others</button>
          </ButtonContainer>
        </TextContainer>
      </CardContent>
    </Card>
  )
}

export default MiniCard
