import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IStoreState } from '../../reducers';
import { IPackage, getPackages, order, IResponseOrderPackageAction, IResponseOrderPackage } from '../../actions';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Input, Col, Container, Row, Button, Card, CardBody, CardTitle, CardSubtitle, CardText, Alert, ListGroup, ListGroupItem, Table } from 'reactstrap';
import { IUser } from '../../actions/users';
import { userInfo } from 'os';

export interface IParam {

}

interface IProps extends RouteComponentProps<IParam> {

}

const mapStateToProps = (state: IStoreState): { packages: IPackage[], cart: IPackage[] } => {
    return {
        packages: state.packages,
        cart: state.cart,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, void, Action>) => ({
    ...{
        order: (user: IUser, pkg: IPackage & { domain: string }, cb: (res: IResponseOrderPackage) => void) => dispatch(order(user, pkg, cb)),
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
    isEmpty: boolean,
    isError: boolean,
}


class Checkout extends Component<MergedProps, IState> {
    state = {
        isEmpty: false,
        isError: false,
    }

    componentDidMount() {
        //this.props.getPackages();
    }

    render() {
        const { location, order, cart } = this.props;
        const user = localStorage.getItem("user");
        const profile = user && (JSON.parse(user) as IUser)
        const productionItem = { ...location.state, domain: "vndevops.com" } as IPackage & { domain: string };
        return (
            <div className={'package-container'}>
                <Container>
                    <Row>
                        <Col xl={12}>
                            {this.state.isEmpty == false &&
                                <div>
                                    <h1>Thông Tin Đơn Hàng</h1>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>Thông Tin chung</CardTitle>

                                            <CardTitle>Người đặt : <strong className={"text-primary"}>{profile && profile.username}</strong></CardTitle>
                                            <CardTitle>Email : <strong className={"text-primary"}>{profile && profile.email}</strong></CardTitle>
                                            <CardTitle>Mobile : <strong className={"text-primary"}>{profile && profile.mobile}</strong></CardTitle>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>Thông Tin Sản Phẩm</CardTitle>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <td>Mã Gói</td>
                                                        <td>Tên Gói</td>
                                                        <td>Đơn Giá</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map((pkg: IPackage) => (

                                                        <tr>
                                                            <td>{pkg.packageID}</td>
                                                            <td>{pkg.packageName}</td>
                                                            <td>{pkg.price}</td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </Table>

                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>Ghi chú</CardTitle>
                                            <CardTitle><strong className={"text-red"}>Bạn có thể đăng ký trước và thanh toán sau cũng được</strong></CardTitle>
                                        </CardBody>
                                    </Card>
                                    <div style={{ margin: 5 }} className={"pull-right"} onClick={() => {
                                        profile && order(profile, productionItem, (res: IResponseOrderPackage) => {
                                            console.log(res);
                                            if (res.code == 200) {
                                                this.setState({
                                                    isEmpty: true,
                                                    isError: false
                                                })
                                            } else {
                                                this.setState({
                                                    isError: true
                                                })
                                            }

                                        })
                                    }}><Button className={"btn btn-primary"}>Đặt Hàng</Button></div>
                                </div>
                            }

                            {this.state.isError &&
                                <Alert color="danger">
                                    Có lỗi xảy ra trong quá trình xử lý dữ liệu
                                </Alert>
                            }

                            {this.state.isEmpty &&
                                <>
                                    <Alert color="primary">
                                        Chúc mừng bạn đã đặt hàng thành công
                                </Alert>
                                    <Alert color="primary">
                                        Một email đã được gửi đến bạn
                                </Alert>
                                </>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)