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
    Button,
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
                <RouterLink to={{ pathname: Common.url() + "", state: { pass: "some data" } }} className={'nav-link'}><strong>VNDEVHOST</strong></RouterLink>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto text-bold" navbar>
                        <RouterLink to={{ pathname: Common.url() + "summary", state: { pass: "some data" } }} className={'nav-link'}>Hosting Linux</RouterLink>
                        <RouterLink to={{ pathname: Common.url() + "bycountry", state: { pass: "some data" } }} className={'nav-link'}>Liên Hệ</RouterLink>
                    </Nav>
                    <NavbarText className={'pointer margin-right-15 text-bold'}>
                        {localStorage.getItem("isAuth") !== "true"
                            && <div onClick={() => { localStorage.removeItem("isAuth"); window.location.href = "/register" }}>Đăng ký</div>
                        }
                    </NavbarText>
                    <NavbarText className={'pointer text-bold'}>
                        {localStorage.getItem("isAuth") === "true"
                            && <div onClick={() => { localStorage.removeItem("isAuth"); window.location.href = "/login" }}>Đăng xuất</div>
                        }
                        {localStorage.getItem("isAuth") !== "true"
                            && <div onClick={() => { localStorage.removeItem("isAuth"); window.location.href = "/login" }}>Đăng nhập</div>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
        </DivNavBar>
    );
}

export default withRouter(NavBar);