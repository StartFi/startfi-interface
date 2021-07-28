import React from 'react'
import styled from 'styled-components'
import LeftArrow from './../../assets/icons/leftarrow.svg'
import RightArrow from './../../assets/icons/rightarrow.svg'
import { usePagination } from 'state/marketplace/hooks'
import * as _ from 'lodash'
import { Row } from 'theme'

const Container = styled(Row)`
  width: 100%;
  max-width: 20vw;
  margin: 0 auto;
`

const Number = styled.div<{ active: boolean }>`
  font-size: 14px;
  line-height: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
  color: ${({ active }) => (active ? '#fff' : '#222')};
  background-color: ${({ active }) => (active ? '#000000' : 'white')};
  border-radius: ${({ active }) => (active ? '100%' : '0')};
`

const PAGES = 4

const Pagination: React.FC = () => {
  const { currentPage, changePage } = usePagination()

  return (
    <Container>
      <img src={LeftArrow} alt="Prev page" onClick={() => (currentPage > 1 ? changePage(currentPage - 1) : null)} />
      {_.times(PAGES, (i: number) => (
        <Number active={i === 0}>{currentPage + 1 + i}</Number>
      ))}
      <img src={RightArrow} alt="Next page" onClick={() => changePage(currentPage + 1)} />
    </Container>
  )
}

export default Pagination
