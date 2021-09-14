import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelBlack, LabelGrey } from '../styles'
import Question from '../../Question'
import { Container, MarginLeft } from '../../Inputs/styles'

interface LabelProps {
  text: string
  question?: string
  grey?: boolean
}

const Label: React.FC<LabelProps> = ({ text, question, grey }) => {
  const { t } = useTranslation()

  return (
    <Container>
      {grey ? <LabelGrey>{t(text)}</LabelGrey> : <LabelBlack>{t(text)}</LabelBlack>}
      {question && (
        <MarginLeft>
          <Question text={question} />
        </MarginLeft>
      )}
    </Container>
  )
}

export default Label
