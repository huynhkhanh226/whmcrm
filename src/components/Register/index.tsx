import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IStoreState } from '../../reducers';
import { IPackage, getPackages } from '../../actions';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Input, Col, Container, Row } from 'reactstrap';
import { IResponseRegister, register, IUser } from '../../actions/users';
import config from '../../config/Config';

export interface IParam {

}

interface IProps extends RouteComponentProps<IParam> {

}

const mapStateToProps = (state: IStoreState): { packages: IPackage[] } => {
    return {
        packages: state.packages,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, void, Action>) => ({
    ...{
        register: (user: IUser, cb: (res: IResponseRegister) => void) => dispatch(register(user, cb)),
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
    isOpen: boolean,
    message: string,
}



class Register extends Component<MergedProps, IState> {
    state = {
        isOpen: false,
        message: ""
    }

    componentDidMount() {
        //this.props.getPackages();
    }

    render() {
        const validationSchema = Yup.object().shape({
            username: Yup.string()
                .min(2, 'Too Short!')
                .max(256, 'Tối đa 256 ký tự')
                .required('Vui lòng nhập username'),
            password: Yup.string()
                .min(2, 'Too Short!')
                .max(256, 'Tối đa 256 ký tự')
                .required('Vui lòng nhập password'),
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Vui lòng nhập email'),
            mobile: Yup.string()
                .min(2, 'Too Short!')
                .max(256, 'Tối đa 256 ký tự')
                .required('Vui lòng nhập mobile'),
        });
        return (
            <div className={'package-container'}>
                <Container className={"width-450"}>
                    <Row>
                        <Col xl={12}>
                            <h1>THÔNG TIN ĐĂNG KÝ</h1>
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                    email: '',
                                    mobile: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    console.log(values);
                                    this.props.register(values, (res) => {
                                        if (res.code == 200) {
                                            config.popup.show("YESNO", res.message, () => {
                                                window.location.href = "/login"
                                            });
                                        }else{
                                            config.popup.show("YESNO", res.message, () => {
                                            });
                                        }
                                    })
                                }}
                            >
                                {({ errors, touched }) => (

                                    <Form>
                                        <FormGroup>
                                            <Label for="username">Tên đăng nhập <sup className={'text-red'}>(*)</sup></Label>
                                            <Field name="username" className={"form-control"} />
                                            {errors.username && touched.username ? (
                                                <div className={'text-red'}>{errors.username}</div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">Mật khẩu <sup className={'text-red'}>(*)</sup></Label>
                                            <Field name="password" className={"form-control"} />
                                            {errors.password && touched.password ? (
                                                <div className={'text-red'}>{errors.password}</div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">Email <sup className={'text-red'}>(*)</sup></Label>
                                            <Field name="email" className={"form-control"} />
                                            {errors.email && touched.email ? (
                                                <div className={'text-red'}>{errors.email}</div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="mobile">Mobile <sup className={'text-red'}>(*)</sup></Label>
                                            <Field name="mobile" className={"form-control"} />
                                            {errors.mobile && touched.mobile ? (
                                                <div className={'text-red'}>{errors.mobile}</div>
                                            ) : null}
                                        </FormGroup>

                                        <button type="submit" className={"btn btn-primary"}>Đăng Ký</button>
                                    </Form>

                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)