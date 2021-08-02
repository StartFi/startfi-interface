import React, { useState } from 'react'
import * as _ from 'lodash'
import { useTranslation } from 'react-i18next'
import ArrowDown from './../../assets/icons/qaarrowdown.svg'
import ArrowUp from './../../assets/icons/qaarrowup.svg'
import { NeedHelp, QA, Answer, Underline, Question, Img } from './styles'

const QAS = 7

const Questions: React.FC = () => {
  const { t } = useTranslation()

  const [selected, setSelected] = useState(-1)

  return (
    <div>
      <NeedHelp>{t('Need Help?')}</NeedHelp>
      <Underline />
      {_.times(QAS, (i: number) => (
        <QA key={i} onClick={() => setSelected(selected === i ? -1 : i)}>
          <Question>
            <div>{t('needHelpQ' + i)}</div>
            <Img src={selected === i ? ArrowUp : ArrowDown} alt="Arrow" />
          </Question>
          {selected === i && <Answer>{t('needHelpA' + i)}</Answer>}
        </QA>
      ))}
    </div>
  )
}

export default Questions
