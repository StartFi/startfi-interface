import Label from '../Input/Label'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row } from 'theme/components'
import Close from '../../assets/icons/close.svg'
import { Img, Input, Count, Outline, Tag } from './styles'

interface TagsProps {
  name: string
  max: number
  value: string[]
  onChange: (value: string[], name: string) => void
}

const Tags: React.FC<TagsProps> = ({ name, max, value, onChange }) => {
  const { t } = useTranslation()

  const [tags, setTags] = useState<string[]>(value)

  const [word, setWord] = useState('')

  return (
    <div>
      <Row>
        <Label text="tags" question="tagsDesc" grey />
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
              onChange([...tags, word], name)
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
