import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import StartFi from '../../assets/svg/StartFi-c 1.svg'

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`
const Logo = styled.img`
  height: 6.625rem;
  width: 6.625rem;
`
const MainText = styled.div`
  font-family: Roboto;
  font-weight: 700;
  margin-top: 49px;
  font-size: 36px;
  color: #5b5b5b;
  text-align: justify;
`

const MainSpan = styled.span`
  font-weight: 900;
  color: #000000;
  border-bottom: 3px solid #000000;
`

const SubText = styled.div`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  margin-top: -15px;
`
const LinkContainer=styled.div`
width: 31.25rem;
margin-top:40px;
display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
`
const PageLink = styled(Link)`
  font-family: Roboto;
  font-weight: 700;
  text-decoration: none;
  color: #5b5b5b;
  font-size: 2.5rem;
  position: relative;
  &:hover {
    color: #000000;

    &:hover:after {
      content: '';
      position: absolute;
      top: 95%;
      right: 70%;
      width: 30%;
      height: 3px;
      background: #000000;
    }
  }
`

export const LandingPage = () => {
    return (
        <PageWrapper>
            {/* <h2>landing page</h2> */}
            <Logo src={StartFi} />
            <MainText>
                <p>
                    <MainSpan>Startfi</MainSpan> marketplace and lunchpad for NFT collateralised loans
        </p>
            </MainText>
            <SubText>
                <p>
                    Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible tokens
        </p>
            </SubText>
            <LinkContainer>
            <PageLink to=''>Marketplace</PageLink>
            <PageLink to=''>Launchpad</PageLink>
            </LinkContainer>

        </PageWrapper>
    )
}
