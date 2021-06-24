import React from 'react';
import styled from 'styled-components';

interface ErrorProps
{
    message:string|undefined
}

const Container=styled.div`
width: 60vW;
height: 150px;
border-radius:3px;
text-align:center;
background: rgba(255, 0, 0, 0.05);

`

const Header =styled.div`
height: 35%;
width:100%;
border-bottom:
1px solid #e3e3e3;
display:flex;
align-items:center;
justify-content:center;


& p{
    color:#BA0404;

}

`
const ErrorDialogue: React.FC<ErrorProps> =({message})=> {
    return (
        <Container>
        <Header>
        <p>Error</p>
        </Header>
        <p>{message}</p>
        </Container>
    );
}

export default ErrorDialogue;