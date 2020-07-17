import React, { ReactElement } from 'react'
import Select  from "react-select";

interface Props {
    data: Array<{[key: string]: any}>,
    value: any,
    keyExpress: string,
    labelExpress: string,
    [key:string]:any,
    onChange: (val: any) => void
}

export const SelectSearch: React.FC<Props> = ({data, value, keyExpress, labelExpress, onChange, ...rest}) => {
    console.log(keyExpress)
    const source = data.map((row: {[k: string]: any})=>{
        return {
            value: row[keyExpress],
            label: row[labelExpress]
        }
    })
    const selectedRow = source.map((row:any)=>{
        if (row[keyExpress] == value){
            return {
                value: value,
                label: row[labelExpress]
            }
        }
    })
    return (
        <>
            <Select options={source}
                onChange={onChange}
                value={selectedRow.length> 0 ? selectedRow[0] : {}}
                {...rest}
                style={{width: "300px"}}>
            </Select>
        </>
    )
}
