import React from 'react';

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
        <div className='AuthBlock__header-box'>
            <div className={`AuthBlock__header`} style={leftPartStyle}>
                <a href='#' onClick={props.setSignInForm} className='AuthBlock__header-btn'>Sign In</a>
            </div>
            <div className={`AuthBlock__header`} style={rightPartStyle}>
                <a href='#' onClick={props.setSignUpForm} className='AuthBlock__header-btn'>Sign Up</a>
            </div>
        </div>
    )
}

export default AuthBlockHeader;