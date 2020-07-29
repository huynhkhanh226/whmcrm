import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IStoreState } from '../../reducers';
import { IPackage, getPackages, order, IResponseOrderPackageAction, IResponseOrderPackage, removePackage } from '../../actions';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Input, Col, Container, Row, Button, Card, CardBody, CardTitle, CardSubtitle, CardText, Alert, ListGroup, ListGroupItem, Table, InputGroup, InputGroupAddon } from 'reactstrap';
import { IUser } from '../../actions/users';
import { userInfo } from 'os';
import config from '../../config/Config';
import { toast } from 'react-toastify';

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

    removeItem = (pkg: IPackage) => {
        this.props.removePackage(pkg, (res) => {
            toast("Sản phẩm đã được xoá")
        })
    }

    render() {
        const { location, order, cart } = this.props;
        const user = localStorage.getItem("user");
        const profile = user && (JSON.parse(user) as IUser)
        const productionItem = { ...location.state, domain: "vndevops.com" } as IPackage & { domain: string };
        const validationSchema = Yup.object().shape({
            domain: Yup.string()
                .min(2, 'Too Short!')
                .max(256, 'Tối đa 256 ký tự')
                .required('Vui lòng nhập tên miền'),
        });
        return (
            <div className={'package-container'}>
                <Container>
                    <Row>
                        <Col xl={12}>
                            {this.state.isEmpty == false &&
                                <div>
                                    <h1 className={"text-center"}>Thông Tin Đơn Hàng</h1>
                                    <FormGroup className={"panel"}>
                                        <Label>Người đặt : <strong className={"text-primary margin-right-15"}>{profile && profile.username.toUpperCase()}</strong></Label>
                                        <Label>Email : <strong className={"text-primary margin-right-15"}>{profile && profile.email}</strong></Label>
                                        <Label>Mobile : <strong className={"text-primary margin-right-15"}>{profile && profile.mobile}</strong></Label>
                                    </FormGroup>

                                    <FormGroup className={"panel"}>
                                        <legend>Thông Tin Sản Phẩm</legend>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <td>Mã Gói</td>
                                                    <td>Tên Gói</td>
                                                    <td>Đơn Giá</td>
                                                    <td>Số Tháng</td>
                                                    <td className={"text-center"}>#</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((pkg: IPackage) => (
                                                    <tr key={pkg.packageID}>
                                                        <td>{pkg.packageID}</td>
                                                        <td>{pkg.packageName}</td>
                                                        <td>{pkg.price * 12 * 1000}VND</td>
                                                        <td>12 tháng</td>
                                                        <td className={"text-center text-red"}><Button onClick={() => this.removeItem(pkg)}>Xoá</Button></td>
                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </Table>
                                    </FormGroup>

                                    <Formik
                                        initialValues={{
                                            domain: '',
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={values => {
                                            // same shape as initial values

                                            console.log(values);
                                            if (cart.length > 1) {
                                                config.popup.show("YES", "Bạn chỉ được chọn một gói sản phẩm")
                                            } else {
                                                console.log(productionItem);
                                                !productionItem && config.popup.show("YES", "Bạn cần chọn sản phẩm cần mua trước");
                                                profile && order(profile, productionItem, (res: IResponseOrderPackage) => {
                                                    console.log(productionItem);
                                                    // if (res.code == 200) {
                                                    //     this.setState({
                                                    //         isEmpty: true,
                                                    //         isError: false
                                                    //     })
                                                    // } else {
                                                    //     this.setState({
                                                    //         isError: true
                                                    //     })
                                                    // }

                                                })
                                            }
                                        }}

                                    >
                                        {({ errors, touched, handleSubmit }) => (
                                            <Form onSubmit={handleSubmit}
                                                onKeyDown={(e: React.KeyboardEvent) => {
                                                    if (e.key === 'Enter') {
                                                        handleSubmit();
                                                    }
                                                }}>

                                                <FormGroup className={"panel"}>
                                                    <legend>Tên miền liên kết <sup className={'text-red'}>(*)</sup></legend>
                                                    <Field name="domain" className={"form-control"} style={{ width: 250 }} />
                                                    {errors.domain && touched.domain ? (
                                                        <div className={'text-red'}>{errors.domain}</div>
                                                    ) : null}
                                                </FormGroup>

                                                <FormGroup className={"panel"}>
                                                    <legend >Mã Giảm Giá</legend>
                                                    <InputGroup style={{ width: 332 }}>
                                                        <Field name="coupon" className={"form-control"} style={{ width: 250 }} />
                                                        <InputGroupAddon addonType="prepend"><Button type={'submit'} className={"btn btn-primary margin-top-15"}>Áp Dụng</Button></InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup className={"panel"}>
                                                    <legend>Hình Thức Thanh Toán</legend>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            MomoPay
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                           VNPay
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check disabled>
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            ZaloPay
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check disabled>
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            Thẻ Ngân Hàng
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check disabled>
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            Thanh Toán Sau
                                                        </Label>
                                                    </FormGroup>
                                                </FormGroup>
                                                <FormGroup className={"panel"}>
                                                    <Label className={"text-red text-bold"}>Tổng Tiền</Label>
                                                </FormGroup>
                                                <FormGroup className={"mg5 text-center "} >
                                                    <Button color="primary" type={'submit'} className={"btn btn-primary"}>Đặt Hàng</Button>
                                                </FormGroup>

                                            </Form>

                                        )}
                                    </Formik>

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