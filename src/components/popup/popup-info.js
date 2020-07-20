/**
 * @copyright 2019 @ DigiNet
 * @author rocachien
 * @create 2019/01/12 10:37
 * @update 2019/01/12 10:37
 * @file src/components/popup-info/popup-info.js
 */

import React, {Component} from 'react';
import './popup.css';

class PopupInfo extends Component{
    render(){
        let {data} = this.props;
        return(
            <div className="popup">
                {data}
            </div>
        )
    }
}


export default PopupInfo;