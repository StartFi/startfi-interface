import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelBlack } from './styles'
import Question from './Question'
import { Container, MarginLeft } from './styles'

interface LabelProps {
  text: string
  question?: string
}

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
