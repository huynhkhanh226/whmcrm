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
import { faUser, faUnlock, faBook, faPager, faShoppingCart, faIcons } from '@fortawesome/free-solid-svg-icons'
import { IStoreState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { IPackage } from '../../actions/packages';
import { Action } from 'redux';
import { removePackage, removeAllPackage } from '../../actions';
import {  toast } from 'react-toastify';

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

    const onRemoveCart = (item: IPackage) => {
        removePackage(item, (res: any) => {
            console.log(cart);
            toast("Bạn đã xoá 1 sản phẩm ra khỏi giỏ hàng"{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }

    const onRemoveAllCart = () => {
        removeAllPackage((res: any) => {
            console.log(cart);
            
        })
    }

    return (
        <DivNavBar>
            <Navbar color="light" fixed="top" light expand="md" className={"fade-in"}>
                <RouterLink to={{ pathname: Common.url() + "", state: { pass: "some data" } }} className={'text-company'}><strong>DEV HOSTING</strong></RouterLink>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto text-bold" navbar>
                        <RouterLink to={{ pathname: Common.url() + "packages", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faIcons} className={"margin-right-5 text-red"} />Hosting Linux</RouterLink>
                        <RouterLink to={{ pathname: Common.url() + "seo", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faIcons} className={"margin-right-5 text-primary"} />SEO</RouterLink>
                        <RouterLink to={{ pathname: Common.url() + "design", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faIcons} className={"margin-right-5 text-warning"} />Thiết Kế Web</RouterLink>
                        <RouterLink to={{ pathname: Common.url() + "contact", state: { pass: "some data" } }} className={'nav-link'}><FontAwesomeIcon icon={faBook} className={"margin-right-5 text-primary"} />Liên Hệ</RouterLink>
                    </Nav>

                    {localStorage.getItem("isAuth") !== "true" &&
                        < NavbarText className={'pointer text-bold'}>
                            <div className={"cart-button"}>
                                <RouterLink to={{ pathname: Common.url() + "register", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link '}><FontAwesomeIcon icon={faUser} className={"text-primary"} />Đăng ký</RouterLink>
                            </div>
                        </NavbarText>
                    }
                    {
                        <NavbarText>
                            <UncontrolledDropdown nav inNavbar className={"cart-button"}>
                                <DropdownToggle nav caret>
                                    <FontAwesomeIcon icon={faShoppingCart} className={"margin-right-5 text-warning"} /><sup>{cart.length || 0}</sup>
                                </DropdownToggle>
                                <DropdownMenu right className={"fade-in"}>
                                        {
                                            cart.map((item: IPackage) => (
                                                <div key={item.packageId} onClick={() => onRemoveCart(item)}>
                                                    <DropdownItem>
                                                        {item.packageName}
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                </div>
                                            ))
                                        }
                                    <DropdownItem>
                                        <RouterLink to={{ pathname: Common.url() + "checkout", state: { pass: "some data" } }} className={'nav-link'}>Thanh Toán</RouterLink>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                    <a onClick={() => onRemoveAllCart()}>Xoá tất cả</a>
                                    </DropdownItem>
                                    
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavbarText>
                    }
                    <NavbarText className={'pointer text-bold'}>
                        <div className={"cart-button"}>
                            {localStorage.getItem("isAuth") === "true"
                                && <RouterLink to={{ pathname: Common.url() + "", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); window.location.href="/login"}} className={'nav-link'}><FontAwesomeIcon icon={faUnlock} className={"margin-right-5  text-red"} />Đăng xuất</RouterLink>
                            }
                            {localStorage.getItem("isAuth") !== "true"
                                && <RouterLink to={{ pathname: Common.url() + "login", state: { pass: "some data" } }} onClick={() => { localStorage.removeItem("isAuth"); }} className={'nav-link'}><FontAwesomeIcon icon={faUnlock} className={"margin-right-5"} />Đăng nhập</RouterLink>
                            }
                        </div>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </DivNavBar >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))