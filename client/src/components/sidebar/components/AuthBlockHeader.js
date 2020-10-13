import React from 'react';

function AuthBlockHeader(props) {
    const color = 'rgb(77, 126, 168)';
    const border = `1px solid ${color}`;
    const leftPartStyle = props.isSignInForm ? {
        borderRight: border,
    } : {
        borderBottom: border,
        boxShadow: `inset -1px -1px 2px 0 ${color}`,
    }
    const rightPartStyle = props.isSignInForm ? {
        borderBottom: border,
        boxShadow: `inset 1px -1px 2px 0 ${color}`,
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