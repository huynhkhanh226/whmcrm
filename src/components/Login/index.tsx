import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IStoreState } from '../../reducers';
import { IPackage, getPackages } from '../../actions';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Input, Col, Container, Row, Button } from 'reactstrap';
import { IResponseRegister, IUser, register, IResponseProfile, login } from '../../actions/users';
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
        login: (inputs: { username: string, password: string }, cb: (res: IResponseProfile) => void) => dispatch(login(inputs, cb)),
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
    isOpen: boolean
}

interface IRedirect {
    redirect: any,
    error: string
}

class Login extends Component<MergedProps, IState> {
    state = {
        isOpen: false
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
        });

        const { location } = this.props;
        const previousState = location.state as IRedirect;

        if (localStorage.getItem("isAuth")) {
            return <Redirect to={{ pathname: '/' }} />;
        }

        return (
            <div className={'package-container'}>
                <Container className={"width-450"}>
                    <Row>
                        <Col xl={12}>
                            <h1>ĐĂNG NHẬP</h1>
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    console.log(values);
                                    this.props.login(values, (res) => {
                                        if (res.code == 200) {
                                            localStorage.setItem("user", JSON.stringify(res.data));
                                            localStorage.setItem("isAuth", "true");
                                            config.popup.show("YES", res.message, () => {
                                                window.location.href = (previousState && previousState.redirect ? previousState.redirect.pathname : "/")
                                            });
                                        } else {
                                            config.popup.show("YESNO", res.message, () => {
                                            });
                                        }
                                    })
                                }}

                            >
                                {({ errors, touched, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}
                                        onKeyDown={(e: React.KeyboardEvent) => {
                                            if (e.key === 'Enter') {
                                                handleSubmit();
                                            }
                                        }}>
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
                                        <Button type={'submit'} className={"btn btn-primary"}>Đăng Nhập</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)