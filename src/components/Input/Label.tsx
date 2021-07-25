import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Row } from 'theme'
import { LabelBlack } from '.'
import Question from './Question'

interface LabelProps {
  text: string
  question?: string
}

const Container = styled(Row)`
  justify-content: flex-start;
  width: fit-content;
`

const MarginLeft = styled.div`
  margin-right: 2vw;
`

const Label: React.FC<LabelProps> = ({ text, question }) => {
  const { t } = useTranslation()

  return (
    <Container>
      <LabelBlack>{t(text)}</LabelBlack>
      {question && (
        <MarginLeft>
          <Question text={question} />
        </MarginLeft>
      )}
    </Container>
  )
}

export default Label
