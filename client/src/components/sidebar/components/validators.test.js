import {validateEmail, validateLogin, validateName, validatePassword} from './validators';

function good(validator) {
    return (value) => {
        expect(validator(value).isValid).toBeTruthy();
    }
}

function bad(validator) {
    return (value) => {
        expect(validator(value).isValid).toBeFalsy();
    }
}

describe('login validation', () => {
    const goodLogin = good(validateLogin);
    const badLogin = bad(validateLogin);

    test('empty', () => {
        badLogin('');
    })

    test('too short', () => {
        badLogin('abcd');
    })

    test('too long', () => {
        badLogin('qwerty123456qwerty123456');
    })

    test('type mismatch', () => {
        badLogin(undefined);
        badLogin(null);
        badLogin(42);
        badLogin({ name: 'Vasya' });
    })

    test('forbidden symbols', () => {
        badLogin('Sonik@');
        badLogin('Sonik#');
        badLogin('So(n)ik');
        badLogin('Sonik-X');
        badLogin('~~~Sonik~~~');
        badLogin('So`n`i`k');
        badLogin('+-Sonik=');
    })

    test('ok', () => {
        goodLogin('4ebur3k');
        goodLogin('admin');
        goodLogin('moclerator');
        goodLogin('__AbCdEfG_322__');
    })
});

describe('password validation', () => {
    const goodPassword = good(validatePassword);
    const badPassword = bad(validatePassword);

    test('empty', () => {
        badPassword('');
    })

    test('too short', () => {
        badPassword('abcd');
    })

    test('too long', () => {
        badPassword('qwerty123456qwerty123456qwerty123456qwerty123456');
    })

    test('type mismatch', () => {
        badPassword(undefined);
        badPassword(null);
        badPassword(42);
        badPassword({ password: 12456 });
    })

    test('ok', () => {
        goodPassword('/monke!_007~');
        goodPassword('123456789');
        goodPassword('p@ssw0rd');
        goodPassword('__AbCdEfG_322__');
    })
});

describe('email validation', () => {
    const goodEmail = good(validateEmail);
    const badEmail = bad(validateEmail);

    test('empty', () => {
        badEmail('');
    })

    test('type mismatch', () => {
        badEmail(undefined);
        badEmail(null);
        badEmail(42);
        badEmail({ password: 12456 });
    })

    test('incorrect structure', () => {
        badEmail('email');
        badEmail('email.com');
        badEmail('@mail.ru');
        badEmail('email@email');
    })

    test('ok', () => {
        goodEmail('a@a.a');
        goodEmail('tickets@mail.co.uk');
    })
});

describe('name validation', () => {
    const goodName = good(validateName);
    const badName = bad(validateName);

    test('empty', () => {
        badName('');
    })

    test('type mismatch', () => {
        badName(undefined);
        badName(null);
        badName(42);
        badName({ name: 'Vasya' });
    })

    test('forbidden symbols', () => {
        badName('Mary@');
        badName('Mary#');
        badName('~~~Mary~~~');
        badName('Mary1');
        badName('Mary_');
    })

    test('ok', () => {
        goodName('Antoine Marie Jean-Baptiste Roger, comte de Saint-Exupery');
        goodName('Mary');
        goodName('b')
    })
});