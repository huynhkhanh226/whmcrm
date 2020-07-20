/**
 * @copyright 2019 @ DigiNet
 * @author rocachien
 * @create 2019/01/12 10:37
 * @update 2019/01/12 10:37
 * @file src/components/popup-yes-no/popup-yes-no.js
 */

import React, { Component } from 'react';
import { Button } from 'reactstrap';

interface IProps {
    cbConfirm?: () => void,
    cbCancel?: () => void,
}

const PopupYesNo: React.FC<IProps> = ({ cbConfirm, cbCancel }) => {
    const _cbConfirm = () => {
        if (cbConfirm) {
            cbConfirm();
        }
    };

    const _cbCancel = () => {
        if (cbCancel) {
            cbCancel();
        }
    };

    return (
        <>
            <Button color="primary" onClick={() => _cbConfirm()}>OK</Button>{' '}
            <Button color="secondary" onClick={() => _cbCancel()}>Cancel</Button>
        </>
    )
}


export default PopupYesNo;