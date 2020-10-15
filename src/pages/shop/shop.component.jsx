import React, { Component } from 'react'

import SHOP_DATA from './shop.data';

export class ShopPage extends Component {
    constructor() {
        super();

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        return (
            <div>
                SHOP PAGE
            </div>
        )
    }
}

export default ShopPage;
