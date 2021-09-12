import React from 'react'
import styled from 'styled-components'

interface SuccessProps {
  message: string | undefined
  dismiss: () => void
}

const Container = styled.div`
  width: 60vw;
  height: 150px;
  border-radius: 3px;
  text-align: center;
`

const Header = styled.div`
  height: 35%;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    color: #000000;
  }
`
const SuccessDialogue: React.FC<SuccessProps> = ({ message, dismiss }) => {
  return (
    <Container onClick={dismiss}>
      <Header>
        <p>Success</p>
      </Header>
      <p>{message}</p>
    </Container>
  )
}

export default SuccessDialogue
