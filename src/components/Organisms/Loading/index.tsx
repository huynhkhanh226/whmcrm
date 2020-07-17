import React from 'react';
import { Spinner } from 'reactstrap';

import './Loading.scss';

const Loading = () => (
    <div className={"loading-container"}>
      <Spinner type="grow" color="primary"/><span style={{marginLeft: 10}}>Loading...</span>
    </div>
);

export default Loading