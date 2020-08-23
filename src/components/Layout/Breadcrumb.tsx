import React, { ReactElement } from 'react'

interface IProps {
    title: string,
}

const MyBreadcrumb: React.FC<IProps> = (props) => {
    return (
        <div>
            <h1 className={"fade-in text-center"}>
                {props.title}
            </h1>
        </div>
    )
}

export default MyBreadcrumb
