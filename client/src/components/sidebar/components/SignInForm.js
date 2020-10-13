import React from 'react';
import UserContext from '../../app/UserContext';

class SignInForm extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            errorMessageStyle: {display: 'none'}
        }
    }

    validateLogin(login) {
        if (typeof login !== 'string' || login.length === 0) {
            return {
                isValid: false,
                message: 'Login should be a non-empty string',
            };
        }
        const regex = /^\w{5,20}$/
        if (!regex.test(login)) {
            return {
                isValid: false,
                message: `Login should match ${regex}`,
            };
        }
        return {isValid: true};
    }

    validatePassword(password) {
        if (typeof password !== 'string' || password.length === 0) {
            return {
                isValid: false,
                message: 'Password should be a non-empty string',
            };
        }
        const regex = /^\w{5,20}$/
        if (!regex.test(password)) {
            return {
                isValid: false,
                message: `Password should match ${regex}`,
            };
        }
        return {isValid: true};
    }

    showError(message) {
        document.getElementsByClassName('SignInForm__error')[0].innerHTML = message;
        this.setState({
            ...this.state,
            errorMessageStyle: {display: 'block'}
        });
    }

    hideErrors() {
        document.getElementsByClassName('SignInForm__error')[0].innerHTML = '';
        this.setState({
            ...this.state,
            errorMessageStyle: {display: 'none'}
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const login = event.target[0].value;
        const password = event.target[1].value;

        const errors = [];
        {
            const {isValid, message} = this.validateLogin(login);
            if (!isValid)
                errors.push(message);
        }
        {
            const {isValid, message} = this.validatePassword(password);
            if (!isValid)
                errors.push(message);
        }

        if (errors.length > 0) {
            this.showError(errors[0]);
            return;
        }

        const response = await fetch(`/api/v1/users/${login}/${password}`);
        switch (response.status) {
            case 200:
                this.hideErrors();
                const user = await response.json();
                console.error(user);
                this.context.login(user);
                break;
            case 404:
                this.showError('No such user');
                break;
            default:
                this.showError('Server error');
        }
    }

    render() {
        return (
            <div className='AuthBlock__form-wrapper SignInForm-wrapper'>
                <form className='AuthBlock__form SignInForm' onSubmit={this.handleSubmit}>
                    <input className='SignInForm__login' type='text' placeholder="Login"/>
                    <input className='SignInForm__password' type='password' placeholder="Password"/>
                    <button className='SignInForm__submit-btn' type='submit'>Sign In</button>
                </form>
                <div className='SignInForm__error' style={this.state.errorMessageStyle}></div>
            </div>
        )
    }
}

export default SignInForm;