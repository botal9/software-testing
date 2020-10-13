import React from 'react';

function LoginLogoutBox(props) {
    if (props.currentUser) {
        return (
            <div className="LogoutBox">
                {props.currentUser.name}
                |
                <a href="#" onClick={props.logout}>Logout</a>
            </div>
        )
    } else {
        return (
            <div className="EnterOrRegisterBox">
                <a href="#" onClick={props.setPage({name: 'Index'})}>Enter</a>
                |
                <a href="#" onClick={props.setPage({name: 'Register'})}>Register</a>
            </div>
        )
    }
}

export default LoginLogoutBox;