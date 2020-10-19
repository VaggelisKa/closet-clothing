import React from 'react';

import './button.styles.scss';


const Button = ({children, cssClass,  ...otherProps}) => {
    return (
        <button 
            className={`${cssClass} custom-button`}
            {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button