/// <reference types="react" />
import React from 'react';


interface TestProps {
    prefixCls?: string;//一些描述
    className?: string;
    role?: string;
    inline?: boolean;
    /**
     * //一些描述
     */
    icon?: string;
    activeClassName?: string;
}


export declare class Test extends React.Component<TestProps, any> {
    static defaultProps: {
        prefixCls: string;
        size: string;
        inline: boolean;
        disabled: boolean;
        loading: boolean;
        activeStyle: {};
    };
    render(): JSX.Element;
}
// export default Test;