import { Dictionary } from '../../constants'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Icon from './../../assets/icons/edit.svg'
import { useTranslation } from 'react-i18next'
import { Box, Edit } from './styles'

interface EditableBoxProps {
  editable?: boolean
  children: React.ReactNode
  link?: string
  state?: Dictionary
}

const EditableBox: React.FC<EditableBoxProps> = ({ editable, children, link, state }) => {
  const history = useHistory()

  const { t } = useTranslation()

  return (
    <Box>
      {editable && (
        <Edit onClick={() => (link ? history.push(link, state) : null)}>
          <img src={Icon} alt="Edit" />
          <div>{t('edit')}</div>
        </Edit>
      )}
      {children}
    </Box>
  )
}

export default EditableBox
