import React from 'react'
// import Grid from '@material-ui/core/Grid'
// import Card from '@material-ui/core/Card'
// import CardMedia from '@material-ui/core/CardMedia'
import Rectangle from '../../assets/images/Rectangle.png'
// import Path from '../../assets/svg/Path.svg'

import {
  Grid,
  LeftGrid,
  RightGrid,
  ImgCard,
  Container,
  LeftTextCard,
  CreatedTitle,
  CreatedText,
  RightTitle,
  RightSubTitle,
  PublisherCard
} from './Nftproduct.styles'
// import ReadMore from '../ReadMore/readmore'
import NFTsHeader from 'components/Header/NFTsHeader'

// const NFTS = styled(Grid)({
//   padding: '4vh 3.2vw',
//   width: '100%'
// })

const Nftproduct = () => {
  // const classes = useStyles()
  // const image = 'https://picsum.photos/200'
  // const [isReadMore, setIsReadMore] = useState(false)

  // const showScroll = (res: boolean) => {
  //   setIsReadMore(res)
  // }

  return (
    <Container>
      <NFTsHeader />
      <Grid>
        <LeftGrid>
          <ImgCard>
            <img src={Rectangle} />
            <p>1234 Views</p>
          </ImgCard>
          <LeftTextCard>
            <CreatedTitle>
              <p>
                Details created By<span>Muhammed Amin</span>
              </p>
            </CreatedTitle>
            <CreatedText>
              <p>
                Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible
                tokens Put your NFT assets up as collateral for a loan, or offer loans to other users on their
                non-fungible tokens
              </p>
            </CreatedText>
          </LeftTextCard>
        </LeftGrid>
        <RightGrid>
          <RightTitle>
            <p>Apple Watch Series 4 GPS</p>
          </RightTitle>
          <RightSubTitle>Prediction: Round 11 (Bronze) - Only 100 Available</RightSubTitle>
          <PublisherCard height="91px">
            <div>
              <p>
                Publisher :<span>Muhammed Amin</span>
              </p>
              <p>8% Percentage on each reselling transaction</p>
            </div>
          </PublisherCard>
          <PublisherCard height="60px">
            <div>
              <p>
                Owner :<span>Mohamed Mounier El - King</span>
              </p>

            </div>
          </PublisherCard>
        </RightGrid>
      </Grid>
    </Container>
  )
}

export default Nftproduct
