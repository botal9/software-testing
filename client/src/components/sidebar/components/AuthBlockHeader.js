import React from 'react';
import './AuthBlockHeader.css'

function AuthBlockHeader(props) {
    const color = 'rgb(223, 217, 226)';
    const border = `1px solid ${color}`;
    const leftPartStyle = props.isSignInForm ? {
        borderRight: border,
    } : {
        borderBottom: border,
        boxShadow: `inset -2px -2px 3px 0 ${color}`,
    }
    const rightPartStyle = props.isSignInForm ? {
        borderBottom: border,
        boxShadow: `inset 2px -2px 3px 0 ${color}`,
    } : {
        borderLeft: border,
    }

    return (
        <div className='AuthBlock-header-wrapper'>
            <div className='AuthBlock-header' style={leftPartStyle}>
                <a href='#' onClick={props.setSignInForm} className='header-swap-btn'>Sign In</a>
            </div>
            <div className='AuthBlock-header' style={rightPartStyle}>
                <a href='#' onClick={props.setSignUpForm} className='header-swap-btn'>Sign Up</a>
            </div>
        </div>
    )
}

export default AuthBlockHeader;