import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ReadMoreProps {
  children: JSX.Element
  showScroll: (read: boolean) => void
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, showScroll }) => {
  const text = children.props.children
  const { t } = useTranslation()

  const [isReadMore, setIsReadMore] = useState(true)
  const textLength = text?.length

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
    showScroll(isReadMore)
  }


  return (
    <p className='text'>
      {isReadMore ? text?.slice(0, 360) : text}

      {textLength > 350 ? (
        <span onClick={toggleReadMore} className='read-or-hide' style={{ fontWeight: 700, cursor: 'pointer' }}>
          {isReadMore ? `...${t('readMore')}` : ` ...${t('showLess')}`}
        </span>
      ) : (
        <span></span>
      )}
    </p>
  )
}

export default ReadMore
