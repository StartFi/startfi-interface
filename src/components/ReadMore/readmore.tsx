import React, { useState } from 'react'

interface ReadMoreProps {
  children: JSX.Element,
  showScroll:(read:boolean)=>void

}

const ReadMore: React.FC<ReadMoreProps> = ({ children,showScroll }) => {
  const text = children.props.children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
    showScroll(isReadMore)


  }
  return (
    <p className='text'>
      {isReadMore ? text?.slice(0, 360) : text}
      <span onClick={toggleReadMore} className='read-or-hide' style={{fontWeight:700}}>
        {isReadMore ? '...Read more' : ' ...show less'}
      </span>
    </p>
  )
}

export default ReadMore
