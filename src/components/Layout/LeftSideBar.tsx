import React, { ReactElement } from 'react'
import styled from "styled-components";
import MainMenu from './MainMenu';
import Categories from '../Category';

const Container = styled.div`
    width: 250px;
    padding: 5px 0px 5px 5px;
`;


interface IProps {
    
}

const LeftSideBar: React.FC<IProps> = (props) => {
    return (
        <Container>
            <MainMenu/>
            <Categories/>
        </Container>
    )
}

export default LeftSideBar
