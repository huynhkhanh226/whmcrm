import React from 'react'

interface IProps {
    handleValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const StatusList: { key: string, value: string }[] = [
    {
        key: "", value: "All Status"
    },
    {
        key: "CONFIRMED", value: "confirmed"
    },
    {
        key: "RECOVERED", value: "recovered"
    },
    {
        key: "DEATHS", value: "deaths"
    }
];

const Status: React.FC<IProps> = ({ handleValueChange }: IProps) => {
    return (
        <>
            <select className="form-control margin-right-15" name={"status"} onChange={(e) => handleValueChange(e)}>
                {
                    StatusList.map(({ key, value }: { key: string, value: string }) => {
                        return (
                            <option key={key.toLowerCase()} value={key.toLowerCase()}>{value}</option>
                        )
                    })
                }
            </select>
        </>
    );
}

export default Status
