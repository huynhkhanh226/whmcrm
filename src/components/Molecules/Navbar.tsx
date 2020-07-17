import React, { useState } from 'react';
import { NavLink as RouterLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavbarText,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
} from 'reactstrap';
import { Common } from '../../helpers';

const DivNavBar = styled.div`
    border-bottom: 1px solid #ededed;
`;

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <DivNavBar>
            <Navbar color="light" fixed="top" light expand="md">
                <RouterLink to={{ pathname: Common.url() + "", state: { pass: "some data" } }} className={'nav-link'}><strong>Coronavirus COVID19</strong></RouterLink>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <RouterLink to={{ pathname: Common.url() +"summary", state: { pass: "some data" } }} className={'nav-link'}>Summary</RouterLink>
                        <RouterLink to={{ pathname: Common.url() +"bycountry", state: { pass: "some data" } }} className={'nav-link'}>By Country</RouterLink>
                    </Nav>
                </Collapse>
            </Navbar>
        </DivNavBar>
    );
}

export default withRouter(NavBar);