import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row } from 'theme/components'
import Close from '../../assets/icons/close.svg'
import { Title, Img, Input, Count, Outline, Tag } from './styles'

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
