import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IStoreState } from '../../reducers';
import { IPackage, getPackages } from '../../actions';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavLink as RouterLink, withRouter } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Loading from '../Loading';
import { Common } from '../../helpers';
import { addCart, removePackage } from '../../actions/cart';
import * as _ from 'lodash';
import config from '../../config/Config';
import { toast } from 'react-toastify';
import MyBreadcrumb from '../Layout/Breadcrumb';
import styled from 'styled-components';

export interface IParam {

}

interface IProps extends RouteComponentProps<IParam> {

}

const mapStateToProps = (state: IStoreState): { packages: IPackage[], cart: IPackage[], } => {
    return {
        packages: state.packages,
        cart: state.cart,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, void, Action>) => ({
    ...{
        getPackages: () => dispatch(getPackages()),
        addCart: (pkg: IPackage, cb: () => void) => dispatch(addCart(pkg, cb)),
        removePackage: (pkg: IPackage, cb: (res: any) => void) => dispatch(removePackage(pkg, cb)),

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

interface IState {

}

const Container = styled.div`
    border: 1px solid #ededed;
    padding: 10px;
`;

const List = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ListItem = styled.div`
    width: calc(100% / 2);
    padding: 5px;
`;

class Packages extends Component<MergedProps, IState> {
    state = {}

    componentDidMount() {
        this.props.getPackages();

    }


    onRegister = (item: IPackage) => {
        const filter = this.props.cart.filter((pkg: IPackage) => {
            return pkg.packageId == item.packageId;
        })
        if (filter.length >= 0) {
            this.props.removePackage(item, (res) => {
                this.props.addCart(item, () => {
                    console.log(this.props.cart);
                    toast("Sản phầm đã được thêm vào giỏ hàng", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            })

        } else {
            this.props.addCart(item, () => {
                console.log(this.props.cart);
                toast("Sản phầm đã được thêm vào giỏ hàng", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }
    }

    render() {
        const { packages } = this.props;
        return (
            <Container>
                <MyBreadcrumb title={"Hosting Linux"} />
                <List>
                    {packages && packages.map((item: IPackage & { months?: number | string }) => (
                        <ListItem className={"card-item-container fade-in"} key={item.packageName}>
                            <Card key={item.packageName}>
                                <CardBody>
                                    <CardTitle>Package Name : <strong className={"text-primary"}>{item.packageName}</strong></CardTitle>
                                    <CardText>Bandwidth : <strong>{item.bandwidth}</strong></CardText>
                                    <CardText>Disk Quota : <strong className={"text-primary"}>{item.diskQuota} MB</strong></CardText>
                                    <CardText>Addon Domain : <strong>{item.maxAddon}</strong></CardText>
                                    <CardText>Sub Domain : <strong>{item.maxSub}</strong></CardText>
                                    <CardText>Max FTP Account : <strong>{item.maxFTP}</strong></CardText>
                                    <CardText>Max Parked Domain : <strong>{item.maxPark}</strong></CardText>
                                    <CardText>Max SQL : <strong>{item.maxSQL}</strong></CardText>
                                    <CardText>Price : <strong className={"text-red"}>{item.price} VND/Tháng</strong></CardText>
                                    <select className={'form-control form-group'} onChange={(e) => item.months = e.target.value}>
                                        <option value="3"> 3 Tháng = {3 * item.price}</option>
                                        <option value="6">6 Tháng = {6 * item.price * 1000}VND</option>
                                        <option value="12">12 Tháng = {12 * item.price * 1000}VND</option>
                                        <option value="24">24 Tháng = {24 * item.price * 1000}VND</option>
                                    </select>
                                    <Button className={'margin-right-15 bg-primary'} onClick={() => this.onRegister(item)}>Đăng Ký</Button>
                                </CardBody>

                            </Card>
                        </ListItem>
                    ))}
                    {
                        !packages && <Loading />
                    }
                </List>
            </Container>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Packages)