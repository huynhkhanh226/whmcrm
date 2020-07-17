import React, { ReactElement } from 'react'
import { Label } from 'reactstrap';
import { ICountry } from '../../actions';
import { Common } from '../../helpers';

export const enum CELL_TYPE  {
    HEADER = "th",
    BODY = "td",
}

interface IProps {
    type: CELL_TYPE,
    isShow: boolean,
    [key:string]: any,
}
const TableCell: React.FC<IProps> = (props) => {
    const {type, children, isShow, ...rest} = props;
    const Tag = type == CELL_TYPE.HEADER ? CELL_TYPE.HEADER : CELL_TYPE.BODY;
    const renderCell = isShow ? <Tag {...rest} >{props.children}</Tag> : null;
    return renderCell;
}

export default TableCell
