/**
 * @copyright 2019 @ DigiNet
 * @author rocachien
 * @create 2019/01/12 10:37
 * @update 2019/01/12 10:37
 * @file src/components/popup/popup.js
 */

import React, { Component } from 'react';
import { Modal, Image } from 'reactstrap';
import './popup.css';

import PopupInfo from './popup-info';
import PopupYesNo from './popup-yes-no';

class Popup extends Component {

    _content = {
        INFO: PopupInfo,
        YES_NO: PopupYesNo
    };

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            data: ''
        }
    }

    _cbClose = () => {
        if (this.state.cbClose) {
            this.state.cbClose();
        }
    };

    onHide() {
        this.setState({ show: false })
        this._cbClose();
    }

    show(name, data, cbConfirm, cbCancel, cbClose) {
        this.setState({
            show: true,
            name: name,
            data: data,
            cbConfirm: () => {
                this.setState({ show: false });
                cbConfirm && cbConfirm();
            },
            cbCancel: () => {
                this.setState({ show: false });
                cbCancel && cbCancel();
            },
            cbClose: () => {
                this.setState({ show: false });
                cbClose && cbClose();
            },
        });
    }

    render() {
        return (
            <Modal show={this.state.show}
                className={"popup"}
                bsSize="small"
                onHide={() => this.onHide()}>
                <div className="table-info display_col">
                    <div className="title-bar display_row align-between popup-header">
                        <div className="pu-title">{"Thông báo"}</div>

close

                    </div>
                    {this.state.name !== '' &&
                        React.createElement(
                            this._content[this.state.name],
                            {
                                data: this.state.data,
                                cbConfirm: this.state.cbConfirm,
                                cbCancel: this.state.cbCancel,
                                cbClose: this.state.cbClose
                            }
                        )
                    }
                </div>
            </Modal>
        )
    }
}


export default Popup;