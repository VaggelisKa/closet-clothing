import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';

import './menu-item.styles.scss'

export const MenuItem = ({title, imageUrl, size, linkUrl}) => {
    let history = useHistory();
    let match = useRouteMatch();

    const handleClick = () => {
        history.push(`${match.url}${linkUrl}`)
    }

    return (
        <div className={`${size} menu-item`} onClick={handleClick}>
            <div         
                style={{backgroundImage: `url(${imageUrl})`}} 
                className= "background-image"
            />
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default MenuItem;
