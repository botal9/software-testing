import React from 'react';
import UserContext from '../user-context/UserContext';
import {validateLogin, validateEmail, validatePassword, validateName} from '../sidebar/components/validators';

class SignUpForm extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.redColor = 'rgb(155, 29, 32)';
        this.blueColor = 'rgb(77, 126, 168)';

        this.state = {
            errorMessageStyle: {display: 'none'},
            inputFieldsCorrectness: {
                login: 'ok',
                name: 'ok',
                email: 'ok',
                password: 'ok',
            }
        }
    }

    showError(message) {
        document.getElementsByClassName('SignUpForm-error')[0].innerHTML = message;
        this.setState({
            ...this.state,
            errorMessageStyle: {display: 'block'}
        });
    }

    hideErrors() {
        document.getElementsByClassName('SignUpForm-error')[0].innerHTML = '';
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
            name: event.target[1].value,
            email: event.target[2].value,
            password: event.target[3].value,
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
                case 'name':
                    validationResult = validateName(fieldValue);
                    break;
                case 'email':
                    validationResult = validateEmail(fieldValue);
                    break;
                default:
                    errors.push('Unexpected form field');
                    continue;
            }
            this.setInputFieldCorrectness(fieldName, validationResult.isValid)
            if (!validationResult.isValid) {
                errors.push(validationResult.message);
            }
        }
        if (errors.length > 0) {
            this.showError(errors[0]);
            return;
        }

        const response = await fetch(`/api/v1/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        switch (response.status) {
            case 201:
                this.hideErrors();
                const user = await response.json();
                this.context.login(user);
                break;
            case 400:
                const error = await response.text();
                this.showError(error);
                break;
            default:
                this.showError('Server error');
        }
    }

    render() {
        const loginClass = `input-${this.state.inputFieldsCorrectness.login}`;
        const nameClass = `input-${this.state.inputFieldsCorrectness.name}`;
        const emailClass = `input-${this.state.inputFieldsCorrectness.email}`;
        const passwordClass = `input-${this.state.inputFieldsCorrectness.password}`;

        return (
            <div className='AuthBlock-form-wrapper SignUpForm-wrapper'>
                <form className='AuthBlock-form SignUpForm' onSubmit={this.handleSubmit}>
                    <input className={loginClass}
                           type='text' placeholder="Login"/>
                    <input className={nameClass}
                           type='text' placeholder="Name"/>
                    <input className={emailClass}
                           type='text' placeholder="E-mail"/>
                    <input className={passwordClass}
                           type='password' placeholder="Password"/>
                    <button className='submit-btn' type='submit'>Sign Up</button>
                </form>
                <div className='AuthBlock-from-error SignUpForm-error'
                     style={this.state.errorMessageStyle} />
            </div>
        )
    }
}

export default SignUpForm;