import React, { Component, Suspense } from 'react';
import { Route, Switch, Router } from "react-router-dom";
import './App.scss';
import { Layout } from './components/Templates/master';
//import { PrivateRoute } from './PrivateRoute';
import { history } from './helpers/history';
import { Common } from './helpers';
import Loading from './components/Organisms/Loading';
//import config from './config/Config';

const Home = React.lazy(() =>
  import(/* webpackChunkName: "home" */ "./components/Organisms/Home")
);

const Summary = React.lazy(() =>
  import(/* webpackChunkName: "summary" */ "./components/Organisms/Summary")
);

const NotFound = React.lazy(() =>
  import(
    /* webpackChunkName: "NotFound" */ "./components/Organisms/NotFound"
  )
);

const ByCountry = React.lazy(() =>
  import(
    /* webpackChunkName: "bycountry" */ "./components/Organisms/ByCountry"
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
    return (
      <div className="App">
          <Router history={history}>
            <Layout>
              <Suspense fallback={<div></div>}>
                <Switch>
                  <Route exact path={Common.url() + ""}  component={ByCountry} />
                  <Route exact path={Common.url() + "summary"} component={Summary} />
                  <Route exact path={Common.url() + "bycountry"} component={ByCountry} />
                  <Route path='*' exact component={NotFound} />
                </Switch>
              </Suspense>
            </Layout>
          </Router>
      </div>
    )
  }
}

