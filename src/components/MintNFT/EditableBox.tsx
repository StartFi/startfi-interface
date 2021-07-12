import { Dictionary } from './../../constants'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Row } from 'theme'
import Icon from './../../assets/icons/edit.svg'

const Box = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 2vh;
  padding: 3vh 2vw;
  background: #fbfbfb;
  border: 1px solid #f4f4f4;
  border-radius: 6px;
`

const Edit = styled(Row)`
  position: absolute;
  top: 2vh;
  right: 1vw;
  background: #ffffff;
  box-shadow: 3px 5px 10px 2px rgba(0, 0, 0, 0.11);
  border-radius: 8px;
  justify-content: space-evenly;
  width: 8vw;
  padding: 1.5vh 0;
`

interface EditableBoxProps {
  editable: boolean
  children: React.ReactNode
  link: string
  state?: Dictionary
}

const EditableBox: React.FC<EditableBoxProps> = ({ editable, children, link, state }) => {
  const history = useHistory()

  return (
    <Box>
      {editable && (
        <Edit onClick={() => history.push(link, state)}>
          <img src={Icon} alt="Edit" />
          <div>Edit</div>
        </Edit>
      )}
      {children}
    </Box>
  )
}

export default EditableBox
