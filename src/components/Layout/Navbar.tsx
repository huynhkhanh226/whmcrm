import React, { useState } from 'react';
import { NavLink as RouterLink, withRouter, RouteComponentProps } from "react-router-dom";
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
    ListGroup,
    ListGroupItem,
    Dropdown,
} from 'reactstrap';
import { Common } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUnlock, faBook, faPager, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { IStoreState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { IPackage } from '../../actions/packages';
import { Action } from 'redux';
import { removePackage, removeAllPackage } from '../../actions';

const DivNavBar = styled.div`
    border-bottom: 1px solid #ededed;
`;


export interface IParam {

}

interface IProps extends RouteComponentProps<IParam> {

}

const mapStateToProps = (state: IStoreState): { cart: IPackage[] } => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, void, Action>) => ({
    ...{
        removePackage: (pkg: IPackage, cb: (res: any) => void) => dispatch(removePackage(pkg, cb)),
        removeAllPackage: (cb: (res: any) => void) => dispatch(removeAllPackage(cb)),
    }

});

const mergeProps = (
    stateProps: ReturnType<typeof mapStateToProps>,
    dispatchProps: ReturnType<typeof mapDispatchToProps>,
    ownProps: IProps,
) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

type MergedProps = ReturnType<typeof mergeProps>;


const NavBar: React.FC<MergedProps> = ({ cart, removePackage, removeAllPackage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleCart = () => setDropdownOpen(prevState => !prevState);

    const onRemoveCart = (item: IPackage) => { 
        removePackage(item, (res: any)=>{ 
            console.log(cart);
        })
    }

    const onRemoveAllCart = () => { 
        removeAllPackage((res: any)=>{ 
            console.log(cart);
        })
    }

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
                    {localStorage.getItem("isAuth") !== "true" &&
                        < NavbarText className={'pointer text-bold margin-right-15'}>
                            <Button>
                                <RouterLink to={{ pathname: Common.url() + "register", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link'}><FontAwesomeIcon icon={faUser} className={"margin-right-5"} />Đăng ký</RouterLink>
                            </Button>
                        </NavbarText>
                    }
                    {cart.length > 0 &&
                        <NavbarText className={"margin-right-15"}>
                            <Dropdown isOpen={dropdownOpen} toggle={toggleCart} className={"cart-buton"}>
                                <DropdownToggle caret>
                                    {localStorage.getItem("isAuth") === "true"
                                        && <span>
                                            <FontAwesomeIcon icon={faShoppingCart} className={"margin-right-5"} />Giỏ hàng
                                            </span>
                                    }
                                </DropdownToggle>
                                <DropdownMenu>
                                        <ListGroup>
                                            {
                                                cart.map((item: IPackage) => (
                                                    <div key={item.packageName} onClick={()=>onRemoveCart(item)}>
                                                        <DropdownItem ><span className={"margin-right-15"}>{item.packageName}</span><a  className={"cart-button"}>x</a></DropdownItem>
                                                    </div>
                                                ))
                                            }
                                            <DropdownItem key={"001"} divider />
                                            <DropdownItem key={"002"} className={"text-left"}><RouterLink to={{ pathname: Common.url() + "checkout", state: { pass: "some data" } }} className={'nav-link'}>Thanh Toán</RouterLink></DropdownItem>
                                            <DropdownItem key={"003"} divider />
                                            <DropdownItem key={"004"} className={"text-left"}><a onClick={() => onRemoveAllCart()}>Xoá tất cả</a></DropdownItem>
                                        </ListGroup>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarText>
                    }
                    <NavbarText className={'pointer text-bold'}>
                        <Button>
                            {localStorage.getItem("isAuth") === "true"
                                && <RouterLink to={{ pathname: Common.url() + "", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link'}><FontAwesomeIcon icon={faUnlock} className={"margin-right-5"} />Đăng xuất</RouterLink>
                            }
                            {localStorage.getItem("isAuth") !== "true"
                                && <RouterLink to={{ pathname: Common.url() + "login", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link'}><FontAwesomeIcon icon={faUnlock} className={"margin-right-5"} />Đăng nhập</RouterLink>
                            }
                        </Button>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </DivNavBar >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))