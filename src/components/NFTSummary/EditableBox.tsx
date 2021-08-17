import React from 'react'
import { useHistory } from 'react-router-dom'
import Icon from './../../assets/icons/edit.svg'
import { useTranslation } from 'react-i18next'
import { Box, Edit } from './styles'
import { useSetStep } from 'state/marketplace/hooks'
import { STEP } from 'state/marketplace/types'

interface EditableBoxProps {
  editable?: boolean
  children: React.ReactNode
  link?: string
  step?: STEP
}

const EditableBox: React.FC<EditableBoxProps> = ({ editable, children, link, step }) => {
  const history = useHistory()

  const { t } = useTranslation()

  const setStep = useSetStep()

  return (
    <Box>
      {editable && (
        <Edit
          onClick={() => {
            if (link && step) {
              history.push(link)
              setStep(step)
            }
          }}
        >
          <img src={Icon} alt="Edit" />
          <div>{t('edit')}</div>
        </Edit>
      )}
      {children}
    </Box>
  )
}

export default EditableBox
