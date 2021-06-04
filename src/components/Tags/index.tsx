import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

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

const Tag = styled.div`
  background: #f4f4f4;
  border-radius: 4px;
  color: #0b0b0b;
  padding: 1vh 1vw;
  margin-right: 0.6vw;
  margin-top: 1vh;
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
  onChange: (e:any) => void
}

const Tags: React.FC<TagsProps> = ({ name, max, onChange }) => {
  const { t } = useTranslation()

  const [tags, setTags] = useState<string[]>([])

  const [value, setvalue] = useState('')

  return (
    <div>
      <Header>
        <Title>{t('tags')}</Title>
        <Count>
          {max} {t('tagsMax')}
        </Count>
      </Header>
      <Outline>
        {tags.map((t: string) => (
          <Tag key={t}>{t}</Tag>
        ))}
        <Input
          placeholder={tags.length === 0 ? t('writeKeyword') : ''}
          value={value}
          onChange={(e: any) => setvalue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setTags([...tags, value])
              setvalue('')
              onChange({target:{name,value:tags}})
            }
          }}
        />
      </Outline>
    </div>
  )
}

export default Tags
