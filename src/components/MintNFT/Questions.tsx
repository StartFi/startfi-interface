import React, { useState } from 'react'
import * as _ from 'lodash'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ArrowDown from './../../assets/icons/qaarrowdown.svg'
import ArrowUp from './../../assets/icons/qaarrowup.svg'

const QAS = 7

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
  border-bottom: 1px solid #ececec;
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
      {_.times(QAS, (i: number) => (
        <QA onClick={() => setSelected(selected === i ? -1 : i)}>
          <Row>
            <div>{t('needHelpQ' + i)}</div>
            <Img src={selected === i ? ArrowUp : ArrowDown} alt="Arrow" />
          </Row>
          {selected === i && <Answer>{t('needHelpA' + i)}</Answer>}
        </QA>
      ))}
    </div>
  )
}

export default Questions
