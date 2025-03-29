import {ReactNode} from "react";
import './Frame.css'

type Props = {
    children: ReactNode;
    classNames?: string;
}

export const Frame = ({children, classNames}: Props) => {
    return (
        <div className={`frame ${classNames}`}>
            {children}
        </div>
    );
};