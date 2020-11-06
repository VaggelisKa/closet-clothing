import styled, { css } from 'styled-components';

const buttonStyles = css`
    background-color: black;
    color: white;
    border: none;

    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
`;

const invertedButtonStyles = css`
    width: auto;
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
    background-color: black;
    color: white;
    border: none;
    }
`;

const googleSignInStyles= css`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff3e30;
    color: white;

    &:hover {
    background-color: darkred;
    border: none;
    color: white;
    }
`;


const facebookSignInStyles = css`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4267b2;
    color: white;

    &:hover {
    background-color: #145ae7;
    border: none;
    color: white;
    }
`;

const getButtonStyles = ({cssClass}) => {
    if (cssClass === 'google-sign-in') {
        return googleSignInStyles
    } else if (cssClass === 'facebook-sign-in') {
        return facebookSignInStyles
    }

    return cssClass === 'inverted' ? invertedButtonStyles : buttonStyles;
}

export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: 100%;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    border: none;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    display: flex;
    justify-content: center;
  
    ${getButtonStyles}
`;