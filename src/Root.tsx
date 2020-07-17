import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

//load goolge font
WebFont.load({
  google: {
    families: ["Source Sans Pro"]
  }
});

interface IProps {
    store: any
}

const Root = ({ store }: IProps) => {
    return (
        <Provider store={store} >
            <Router>
                <Route path="/:filter?" component={App} />
            </Router>
        </Provider>
    )
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root

