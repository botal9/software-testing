export function validateLogin(login) {
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

export function validatePassword(password) {
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

export function validateEmail(email) {
    if (typeof email !== 'string' || email.length === 0) {
        return {
            isValid: false,
            message: 'Email should be a non-empty string',
        };
    }
    const regex = /^(.+?)@(.+?)\.(.+?)$/
    if (!regex.test(email)) {
        return {
            isValid: false,
            message: `Incorrect email`,
        };
    }
    return {isValid: true};
}

export function validateName(name) {
    if (typeof name !== 'string' || name.length === 0) {
        return {
            isValid: false,
            message: 'Name should be a non-empty string',
        };
    }
    if (name.length > 100) {
        return {
            isValid: false,
            message: 'Maximum Name length is 100',
        };
    }
    const regex = /^[A-Za-z ]+$/
    if (!regex.test(name)) {
        return {
            isValid: false,
            message: 'Name can contain only latin characters',
        };
    }
    return {isValid: true};
}
