import React from 'react';
import '@testing-library/react';
import App from './App';
import {shallow} from 'enzyme';


describe('<App />', () => {
    test('save user on login', () => {
        const testUser = {
            login: 'admin',
            password: 'admin',
            email: 'admin@admin.ru',
            name: 'Vasya',
        }

        const AppComponent = shallow(<App/>);
        const instance = AppComponent.instance();

        expect(AppComponent.state('userState')).toHaveProperty('user', null);
        instance.login(testUser);
        expect(AppComponent.state('userState')).toHaveProperty('user', testUser);
        instance.logout();
        expect(AppComponent.state('userState')).toHaveProperty('user', null);
    });
});
