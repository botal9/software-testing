describe('Cypress tests', () => {
    const user = {
        login: 'Vovan',
        name: 'Vladimir',
        email: 'vovan2006@mail.ru',
        password: 'vovan1234'
    }

    beforeEach(() => {
        cy.request('DELETE', '/api/v1/test/reset');
        cy.request('POST', '/api/v1/users/add', user);

        cy.visit('/');
        cy.get('form.SignInForm')
            .children()
            .first()
            .type(user.login)
            .next()
            .type(user.password);
        cy.get('form.SignInForm')
            .get('button.submit-btn')
            .click();
    })

    it('check log in completeness', () => {
        cy.url()
            .should('include', '/Feed');
        cy.get('.UserInfo .user-login')
            .should('contain', user.login);
        cy.get('nav .nav-links')
            .children()
            .should('have.length', 4);
    })

    it('log out', () => {
        cy.get('.UserInfo .logout')
            .click();

        cy.url()
            .should('include', '/Feed');
        cy.get('nav .nav-links')
            .children()
            .should('have.length', 2);
    })

    it('add post', () => {
        cy.contains('Add Post')
            .click();

        cy.get('input.PostForm-title')
            .type('First post');
        cy.get('textarea.PostForm-text')
            .type('This is my first post.');
        cy.get('.PostForm .submit-btn')
            .click();

        cy.get('.Feed-container')
            .should('contain', 'First post')
            .and('contain', 'This is my first post.')
            .and('contain', user.login);
    })

    it('watch userlist', () => {
        cy.contains('Users')
            .click();

        cy.get('.Users-list')
            .should('have.length', 1)
            .and('contain', user.login);
    })
})

describe('Registration test', () => {
    const newUser = {
        login: 'admin',
        name: 'Vova',
        email: 'a@a.a',
        password: 'admin'
    }

    it('register new user', () => {
        cy.request('DELETE', '/api/v1/test/reset');
        cy.visit('/');

        cy.get('.AuthBlock-header-wrapper')
            .contains('Sign Up')
            .click();
        cy.get('form.SignUpForm')
            .children()
            .first()
            .type(newUser.login)
            .next()
            .type(newUser.name)
            .next()
            .type(newUser.email)
            .next()
            .type(newUser.password);
        cy.get('form.SignUpForm')
            .get('button.submit-btn')
            .click();

        cy.get('.UserInfo .user-login')
            .should('contain', newUser.login);
    })
})
