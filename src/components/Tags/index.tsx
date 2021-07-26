import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Row } from 'theme/components'
import Close from '../../assets/icons/close.svg'

const Title = styled.div`
  color: #7e7e7e;
`

const Count = styled.div`
  font-size: 12px;
  color: #444444;
`

const Outline = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 2vh;
  min-height: 15vh;
  height: fit-content;
  padding: 1vh 1vw 2vh 1vw;
`

export const Tag = styled(Row)`
  background: #f4f4f4;
  border-radius: 4px;
  color: #0b0b0b;
  padding: 1vh 1vw;
  margin-right: 0.6vw;
  margin-top: 1vh;
  max-width: fit-content;
`

const Img = styled.img`
  background-color: white;
  padding: 0.5vh 0.5vw;
  margin-left: 1vw;
`

const Input = styled.input`
  margin-top: 1vh;
  height: 4vh;
  border: none;
  outline: none;
  ::placeholder {
    font-size: 14px;
    color: #444444;
  }
`

interface TagsProps {
  name: string
  max: number
  value: string[]
  onChange: (e: any) => void
}

const Tags: React.FC<TagsProps> = ({ name, max, value, onChange }) => {
  const { t } = useTranslation()

  const [tags, setTags] = useState<string[]>(value)

  const [word, setWord] = useState('')

  return (
    <div>
      <Row>
        <Title>{t('tags')}</Title>
        <Count>
          {max} {t('tagsMax')}
        </Count>
      </Row>
      <Outline>
        {tags.map((t, i) => (
          <Tag key={t}>
            {t}
            <Img
              src={Close}
              alt="Close"
              onClick={() => {
                const newtags = [...tags]
                newtags.splice(i, 1)
                setTags(newtags)
              }}
            />
          </Tag>
        ))}
        <Input
          placeholder={tags.length === 0 ? t('writeKeyword') : ''}
          value={word}
          onChange={(e: any) => setWord(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onChange({ target: { name, value: [...tags, word] } })
              setTags([...tags, word])
              setWord('')
            }
          }}
        />
      </Outline>
    </div>
  )
}

export default Tags
