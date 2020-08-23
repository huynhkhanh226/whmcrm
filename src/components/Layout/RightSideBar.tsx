import React, { ReactElement } from 'react'
import styled from "styled-components";

const Container = styled.div`
    width: 250px;
`;


interface IProps {
    
}

const RightSideBar: React.FC<IProps> = (props) => {
    return (
        <Container>
            Hello RightSideBar
        </Container>
    )
}

export default RightSideBar
