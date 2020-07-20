
import React, { Component } from 'react';
import { Button } from 'reactstrap';

interface IProps {
    cbConfirm: ()=>void,
}

const PopupInfo: React.FC<IProps> = ({ cbConfirm }) => {
    return (
        <>
            <Button color="primary" onClick={()=>cbConfirm()}>OK</Button>{' '}
        </>
    )
}

export default PopupInfo;