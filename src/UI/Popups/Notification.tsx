import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Row } from 'theme'
import Check from './../../assets/icons/whitecheck.svg'
import Times from './../../assets/icons/whitetimes.svg'
import { useSpring, animated } from 'react-spring'

const Container = styled(Row)`
  background: #000000;
  border-radius: 100px;
  padding: 1vh 2vw;
  z-index: 999;
`

const Text = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  white-space: nowrap;
  text-align: center;
  margin: 0 auto;
`

const Img = styled.img`
  margin-right: 1vw;
`

const Notification: React.FC<{
  hash: string
  success?: boolean
  summary?: string
}> = ({ hash, success, summary }) => {
  const { t } = useTranslation()
  const slideDownAnimation = useSpring({
    from: { width: 0, opacity: 0 },
    to: { width: 400, opacity: 1 }
  })
  return (
    <animated.div style={slideDownAnimation}>
      <Container>
        <Img src={success ? Check : Times} alt="Status" />
        <Text>{t(summary)}</Text>
      </Container>
    </animated.div>
  )
}

export default Notification
