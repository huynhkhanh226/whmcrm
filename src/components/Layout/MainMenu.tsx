import React, { Component } from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as RouterLink, withRouter, RouteComponentProps } from "react-router-dom";
import { faUser, faUnlock, faBook, faPager, faShoppingCart, faIcons, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Common } from '../../helpers';

interface IProps {

}

const Container = styled.div`
border: 1px solid #ededed;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #ededed;
    padding: 5px;
`;

const MenuItem = styled.div`
    border-bottom: 1px solid #ededed;
`;

const MainMenu: React.FC<IProps> = props => {
    return (
        <Container>
            <Title>Main Menu</Title>
            <MenuItem>
                <RouterLink to={{ pathname: Common.url() + "packages", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faIcons} className={"margin-right-5 text-red"} />Hosting Linux</RouterLink>
            </MenuItem>
            <MenuItem>
                <RouterLink to={{ pathname: Common.url() + "design", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faIcons} className={"margin-right-5 text-warning"} />Dịch Vụ Website</RouterLink>
            </MenuItem>
            <MenuItem>
                <RouterLink to={{ pathname: Common.url() + "contact", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faBook} className={"margin-right-5 text-primary"} />Liên Hệ</RouterLink>
            </MenuItem>
        </Container>
    )
}

export default MainMenu