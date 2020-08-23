import React, { } from 'react'
import PropTypes from 'prop-types';
import NavBar from './Navbar';
import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

const Header = styled.div`
    height: 72px;
`;

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

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Content = styled.div`
    display: flex;
    flex-direction:column;
    width: calc(100% - 500px);
    padding: 5px;
`;


interface IProps {

}

export const Master: React.FC<IProps> = ({ children }) => {
    return (
        <>
            <Wrapper>
                <ToastContainer />
                <Header>
                    <NavBar />
                </Header>
                <Body>
                    <LeftSideBar />
                    <Content>
                        {children}
                    </Content>
                    <RightSideBar />
                </Body>
            </Wrapper>
        </>
    );
}

Master.propTypes = {
    children: PropTypes.element.isRequired
};