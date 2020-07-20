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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUnlock, faBook, faPager, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

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
                        <RouterLink to={{ pathname: Common.url() + "packages", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faPager} className={"margin-right-5"} />Hosting Linux</RouterLink>
                        <RouterLink to={{ pathname: Common.url() + "contact", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faBook} className={"margin-right-5"} />Liên Hệ</RouterLink>
                    </Nav>
                    <NavbarText className={'pointer text-bold'}>
                        {localStorage.getItem("isAuth") !== "true"
                            && <RouterLink to={{ pathname: Common.url() + "register", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link'}><FontAwesomeIcon icon={faUser} className={"margin-right-5"} />Đăng ký</RouterLink>
                        }
                    </NavbarText>
                    <NavbarText className={'pointer text-bold'}>
                        {localStorage.getItem("isAuth") === "true"
                            && <RouterLink to={{ pathname: Common.url() + "", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link'}><FontAwesomeIcon icon={faUnlock} className={"margin-right-5"} />Đăng xuất</RouterLink>
                        }
                        {localStorage.getItem("isAuth") !== "true"
                            && <RouterLink to={{ pathname: Common.url() + "login", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link'}><FontAwesomeIcon icon={faUnlock} className={"margin-right-5"} />Đăng nhập</RouterLink>
                        }
                    </NavbarText>
                    <NavbarText className={'pointer text-bold'}>
                        {localStorage.getItem("isAuth") === "true"
                            && <RouterLink to={{ pathname: Common.url() + "checkout", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faShoppingCart} className={"margin-right-5"} />Giỏ hàng</RouterLink>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
        </DivNavBar>
    );
}

export default withRouter(NavBar);