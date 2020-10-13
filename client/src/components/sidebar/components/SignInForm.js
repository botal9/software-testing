import React from 'react';
import UserContext from '../../app/UserContext';
import {validateLogin, validatePassword} from './validators';

class SignInForm extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            errorMessageStyle: {display: 'none'},
            inputFieldsCorrectness: {
                login: 'ok',
                password: 'ok',
            }
        }
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

    setInputFieldCorrectness(fieldType, isCorrect) {
        this.setState(state => (
            state.inputFieldsCorrectness[fieldType] = isCorrect ? 'ok' : 'error', state)
        );
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            login: event.target[0].value,
            password: event.target[1].value,
        }

        const errors = [];
        for (const [fieldName, fieldValue] of Object.entries(user)) {
            let validationResult = null;
            switch (fieldName) {
                case 'login':
                    validationResult = validateLogin(fieldValue);
                    break;
                case 'password':
                    validationResult = validatePassword(fieldValue);
                    break;
                default:
                    errors.push('Unexpected form field');
                    continue;
            }
            this.setInputFieldCorrectness(fieldName, validationResult.isValid)
            if (!validationResult.isValid)
                errors.push(validationResult.message);
        }
        if (errors.length > 0) {
            this.showError(errors[0]);
            return;
        }

        const response = await fetch(`/api/v1/users/${user.login}/${user.password}`);
        switch (response.status) {
            case 200:
                this.hideErrors();
                const user = await response.json();
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
        const loginClass = `AuthBlock__input input-${this.state.inputFieldsCorrectness.login}`;
        const passwordClass = `AuthBlock__input input-${this.state.inputFieldsCorrectness.password}`;

        return (
            <div className='AuthBlock__form-wrapper SignInForm-wrapper'>
                <form className='AuthBlock__form SignInForm' onSubmit={this.handleSubmit}>
                    <input className={loginClass}
                           type='text' placeholder="Login"/>
                    <input className={passwordClass}
                           type='password' placeholder="Password"/>
                    <button className='AuthBlock__submit-btn SignInForm__submit-btn'
                            type='submit'>Sign In</button>
                </form>
                <div className='AuthBlock__error SignInForm__error' style={this.state.errorMessageStyle}></div>
            </div>
        )
    }
}

export default SignInForm;