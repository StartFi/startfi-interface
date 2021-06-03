import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ArrowDown from "./../../assets/icons/qaarrowdown.svg"
import ArrowUp from "./../../assets/icons/qaarrowup.svg"

const QAS = [
    [
      'What is an NFT? Is it a cryptocurrency?',
      `Non-Fungible Tokens are unique, easily verifiable digital assets that can represent items such as GIFs, images, videos, music albums, and more. Anything that exists online can be purchased as an NFT, theoretically. An NFT is “a type of cryptographic token,” Emerging Tech Brew writer Ryan Duffy explains, but NFTs are different from cryptocurrencies because they’re not interchangeable. Think of Pokémon cards: You can trade them, but a Gastly is not the same as a holographic Charizard. But a bitcoin is indistinguishable from another bitcoin.`
    ],
    ["Why would I want to own an NFT? Can I make money on it?",""],
    ["How do you buy an NFT?",""],
    ["How do you know your NFT is authentic?",""],
    ["Are NFTs new?",""],
    ["Choose your NFT Product Category",""],
    ["What is an NFT? Is it a cryptocurrency?",""]
  ]

const NeedHelp = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding: 0 3vw;
  margin-bottom: 2vh;
`

const Underline = styled.hr`
  margin-top: 2vh;
  width: 3vw;
  height: 0.3vh;
  text-align: left;
  margin-left: 0;
  margin: 0 3vw;
  background-color: ${({ theme }) => theme.black};
`

const Row = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
height: 100px;
`

// const Question = styled.div`

const Answer = styled.div`
  font-size: 14px;
  color: #555555;
  padding-bottom: 6vh;
`

const QA = styled.div`
cursor: pointer;
border-bottom: 1px solid #ECECEC;
padding: 0 3vw;
`

const Img = styled.img`
margin-left: 2vw;
`

const Questions: React.FC = () => {

  const { t } = useTranslation()

  const [selected, setSelected] = useState(-1)

  return (
    <div>
      <NeedHelp>{t('Need Help?')}</NeedHelp>
      <Underline />
      {QAS.map((qa, i) => (
        <QA onClick={() => setSelected(selected === i ? -1 : i)}>
          <Row><div>{t(qa[0])}</div><Img src={selected === i ? ArrowUp : ArrowDown} alt="Arrow"/></Row>
          {selected === i && <Answer>{t(qa[1])}</Answer>}
        </QA>
      ))}
    </div>
  )
}

export default Questions
