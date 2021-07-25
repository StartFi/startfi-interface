import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Row } from 'theme'
import Icon from './../../assets/icons/question.svg'

const Circle = styled(Row)`
  margin-left: 1vw;
  display: inline-flex;
  position: relative;
  background: #f7f7f7;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  justify-content: center;
`

interface TooltipProps {
  readonly minWidth?: string
}

const Tooltip = styled.div<TooltipProps>`
  position: absolute;
  top: 2vh;
  left: 2vw;
  padding: 2vh 2vw;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '20vw')};
  background: #ffffff;
  border: 1px solid #f7f7f7;
  box-sizing: border-box;
  box-shadow: 6px 8px 11px 2px rgba(230, 230, 230, 0.25);
  border-radius: 8px;
  color: #555555;
  z-index: 99;
`

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
