import styled from "styled-components";


interface ContainerProps {
    readonly minHeight: string
  }

  export const Container = styled.div<ContainerProps>`
    width: 35vw;
    padding: 3vh 2vw;
    background-color: #fafafa;
    border-radius: 8px;
    min-height: ${({ minHeight }) => minHeight};
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

  `

  export const TextContainer =styled.div`
  display:flex;
  & p{
      width:60%
  }
  `


