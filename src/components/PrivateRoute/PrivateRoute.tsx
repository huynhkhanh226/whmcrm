import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
    exact?: boolean;
    path?: string;
}

export const PrivateRoute = ({ component: Component, path, ...rest }: PrivateRouteProps) => {
    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                const redirect = { redirect: props.location, error: "You need to login first!" }
                return (
                    localStorage.getItem('isAuth')
                        ? <Component {...props} />
                        : <Redirect to={{ pathname: '/login', state: redirect }} />
                )
            }} />
    )
}