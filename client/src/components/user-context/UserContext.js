import {createContext} from 'react';

const UserContext = createContext({
    user: null,
    login: (user) => {},
    logout: () => {}
});

export default UserContext;