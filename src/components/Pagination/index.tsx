import React from 'react'
import LeftArrow from './../../assets/icons/leftarrow.svg'
import RightArrow from './../../assets/icons/rightarrow.svg'
import { usePagination } from 'state/marketplace/hooks'
import { Container, Number } from './styles'

const Pagination: React.FC = () => {
  const { currentPage, isNext, changePage } = usePagination()

  return (
    <Container>
      <img src={LeftArrow} alt="Prev page" onClick={() => (currentPage > 0 ? changePage(currentPage - 1) : null)} />
      <Number active={true}>{currentPage + 1}</Number>
      <img src={RightArrow} alt="Next page" onClick={() => (isNext ? changePage(currentPage + 1) : null)} />
    </Container>
  )
}

export default Pagination
