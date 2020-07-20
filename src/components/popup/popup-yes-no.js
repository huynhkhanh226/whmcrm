/**
 * @copyright 2019 @ DigiNet
 * @author rocachien
 * @create 2019/01/12 10:37
 * @update 2019/01/12 10:37
 * @file src/components/popup-yes-no/popup-yes-no.js
 */

import React, {Component} from 'react';
import './popup.css';

class PopupYesNo extends Component{

    _cbConfirm=()=>{
        if(this.props.cbConfirm){
            this.props.cbConfirm();
        }
    };

    _cbCancel=()=>{
        if(this.props.cbCancel){
            this.props.cbCancel();
        }
    };
    
    render(){
        let {data} = this.props;
        return(
            <div className="popup">
                {data}
                <div className="popup-bottom">
                    <div className="popup-btn-ok" onClick={this._cbConfirm} >{"OK"}</div>
                    <div className="popup-btn-cancel" onClick={this._cbCancel}>{"Cancel"}</div>
                </div>
            </div>
        )
    }
}


export default PopupYesNo;