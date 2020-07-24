import React, { Component, Suspense } from 'react';
import { Route, Switch, Router } from "react-router-dom";
import './App.scss';
import { Master } from './components/Layout/master';
import { Guest } from './components/Layout/Guest'
//import { PrivateRoute } from './PrivateRoute';
import { history } from './helpers/history';
import { Common } from './helpers';
import Loading from './components/Loading';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import Popup from './components/popup/popup';
import config from './config/Config';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "login" */ "./components/Login")
);

const Register = React.lazy(() =>
  import(/* webpackChunkName: "register" */ "./components/Register")
);

const Home = React.lazy(() =>
  import(/* webpackChunkName: "home" */ "./components/Home")
);

const Packages = React.lazy(() =>
  import(/* webpackChunkName: "packages" */ "./components/Packages")
);

const Contact = React.lazy(() =>
  import(/* webpackChunkName: "contact" */ "./components/Contact")
);


const NotFound = React.lazy(() =>
  import(
    /* webpackChunkName: "NotFound" */ "./components/NotFound"
  )
);

const Checkout = React.lazy(() =>
  import(
    /* webpackChunkName: "NotFound" */ "./components/Checkout"
  )
);


interface IProps {

}
interface IState {

}

export default class App extends Component<IProps, IState> {
  state = {}
  constructor(props: IProps) {
    super(props);
    //tracing router
    history.listen((location, action) => {
      //console.log(this.props.match.url);
      //console.log("Hello");
      //console.log(action);
      // console.log(this.props.match.url);
      // console.log(this.props.location.pathname);
      // this.props.clearAlerts();
    });
  }


  render() {
    const isAuth = localStorage.getItem("isAuth");
    const Layout = isAuth === "true" ? Master : Guest;
    return (
      <div className="App">
        <Router history={history}>
          <Layout>
            <Suspense fallback={<div></div>}>
              <Switch>
                <Route exact path={Common.url() + "login"} component={Login} />
                <Route exact path={Common.url() + "register"} component={Register} />
                <Route exact path={Common.url() + ""} component={Home} />
                <Route exact path={Common.url() + "packages"} component={Packages} />
                <Route exact path={Common.url() + "contact"} component={Contact} />
                <PrivateRoute path={Common.url() + "checkout"} component={Checkout} />
                <Route path='*' exact component={NotFound} />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
        <Popup ref={(ref)=>config.popup = ref} />
      </div>
    )
  }
}

