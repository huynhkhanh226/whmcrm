import React, { } from 'react'
import PropTypes from 'prop-types';
import NavBar from './Navbar';
import styled from "styled-components";


const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    margin-top: 72px;
`;

interface Props {

}

export const Master: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Wrapper>
                <NavBar />
                <Container>{children}</Container>
            </Wrapper>
        </>
    );
}

Master.propTypes = {
    children: PropTypes.element.isRequired
};