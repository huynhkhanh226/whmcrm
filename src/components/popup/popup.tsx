
import React, { Component } from 'react';

import PopupInfo from './popup-info';
import PopupYesNo from './popup-yes-no';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
interface IState {
    show: boolean,
    name: string,
    data: string,
    cbConfirm: () => void,
    cbCancel: () => void,
    cbClose: () => void
}

const MODAL_TYPE = {
    INFO: "YES",
    YESNO: "YESNO"
}

interface IProps {

}

class Popup extends Component<IProps, IState> {
    state = {
        show: false,
        name: "",
        data: '',
        cbConfirm: () => { },
        cbCancel: () => () => { },
        cbClose: () => () => { },
    }
    _content = {
        INFO: PopupInfo,
        YESNO: PopupYesNo
    };

    _onClose() {
        this.setState({ show: false })
        if (this.state.cbClose) {
            this.state.cbClose();
        }
    }

    show = (name: string, data: string, cbConfirm: () => void, cbCancel: () => void, cbClose: () => void) => {
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
            <Modal isOpen={this.state.show} toggle={() => this._onClose()} >
                <ModalHeader toggle={() => this._onClose()}>Thông báo</ModalHeader>
                <ModalBody>
                    {this.state.data}
                </ModalBody>
                <ModalFooter>
                    {this.state.name != '' && this.state.name == MODAL_TYPE.INFO &&
                        React.createElement(
                            PopupInfo,
                            {
                                cbConfirm: this.state.cbConfirm,
                            }
                        )
                    }
                    {this.state.name != '' && this.state.name == MODAL_TYPE.YESNO &&
                        React.createElement(
                            PopupYesNo,
                            {
                                cbConfirm: this.state.cbConfirm,
                                cbCancel: this.state.cbCancel,
                            }
                        )
                    }
                </ModalFooter>
            </Modal>
        )
    }
}


export default Popup;