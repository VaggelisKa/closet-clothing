import React from 'react';

import {
    ErrorImageContainer,
    ErrorImageOverlay,
    ErrorImageText
} from './error.boundary.styles';

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        return this.state.hasError ? 
            (<ErrorImageOverlay>
                <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png'/>
                <ErrorImageText>A dog ate this page, please try again later!</ErrorImageText>
            </ErrorImageOverlay>) 
            : this.props.children;
    }
}

export default ErrorBoundary;