import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './../../assets/icons/question.svg'
import { Circle, Tooltip } from '../Inputs/styles'

interface QuestionProps {
  text: string
  tooltipWidth?: string
}

const Question: React.FC<QuestionProps> = ({ text, tooltipWidth }) => {
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Circle onClick={() => setIsOpen(!isOpen)}>
      <img src={Icon} alt="question" />
      {isOpen && <Tooltip minWidth={tooltipWidth}>{t(text)}</Tooltip>}
    </Circle>
  )
}

export default Question
