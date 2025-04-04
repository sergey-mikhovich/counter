import {ReactNode} from "react";
import './Frame.css'
import * as React from "react";

type Props = {
    children: ReactNode;
    classNames?: string;
}

const frame = ({children, classNames}: Props) => {
    return (
        <div className={`frame ${classNames}`}>
            {children}
        </div>
    );
};

export const Frame = React.memo(frame)



