import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

interface IParams {
    
}

interface IProps extends RouteComponentProps<IParams> {}

interface State {}

interface IRedirect{
    redirect: any,
    error: string
}

class Login extends Component<IProps, State>{
    render() {
        const { location } = this.props;
        const state = location.state as IRedirect;

        if (localStorage.getItem("isAuth")){
            return <Redirect to={{ pathname: '/home'}} />;
        }

        return (
            <LoginDiv>
                <h3>{state && state.error}</h3>
                <Button onClick={() => { localStorage.setItem("isAuth", "true"); window.location.href = (state ? state.redirect.pathname : "/") }}>Login via Partner Git</Button>
            </LoginDiv>
        )
    }
}

export default Login



