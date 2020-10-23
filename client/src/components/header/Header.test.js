import {mount} from 'enzyme';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import UserContext from '../user-context/UserContext';

describe('<Header/>', () => {
    const userState = {
        user: null,
        logout() {
            this.user = null;
        },
        login(user) {
            this.user = user;
        },
    }

    const testUser = {
        login: 'admin',
        password: 'admin',
        email: 'admin@admin.ru',
        name: 'Vasya',
    }

    const TestHeader = (
        <UserContext.Provider value={userState}>
            <Router>
                <Header/>
            </Router>
        </UserContext.Provider>
    )

    test('user not logged in', () => {
        const HeaderComponent = mount(TestHeader);

        const navLinksHtml = HeaderComponent.find('.nav-links').html();
        expect(HeaderComponent.find('.nav-links a')).toHaveLength(2);
        expect(navLinksHtml).toMatch(/Feed/);
        expect(navLinksHtml).toMatch(/Users/);
        expect(navLinksHtml).not.toMatch(/Post/);

        HeaderComponent.unmount();
    });

    test('user logged in', () => {
        userState.login(testUser)
        const HeaderComponent = mount(TestHeader);

        const navLinksHtml = HeaderComponent.find('.nav-links').html();
        expect(HeaderComponent.find('.nav-links a').length).toBe(4);
        expect(navLinksHtml).toMatch(/Feed/);
        expect(navLinksHtml).toMatch(/Users/);
        expect(navLinksHtml).toMatch(/Add Post/);
        expect(navLinksHtml).toMatch(/My Posts/);

        HeaderComponent.unmount();
        userState.logout()
    });
});
