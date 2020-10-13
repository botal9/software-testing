const users = {
    'admin': {
        login: 'admin',
        password: 'admin',
        name: 'Vasya',
        surname: 'Pupkin',
        salary: '300kk/ns'
    }
};

function addUser(user) {
    if (user === undefined ||
        user.login === undefined) {
        throw Error('Trying to add invalid user');
    }
    if (users[user.login] !== undefined) {
        throw Error('Trying to add existing user');
    }
    users[user.login] = user;
}

function getUserByLogin(userLogin) {
    return users[userLogin] || null;
}

function getAllUsers() {
    const usersList = []
    for (const userLogin in users) {
        usersList.push(users[userLogin]);
    }
    return usersList;
}

function deleteUser(userLogin) {
    if (users[userLogin] === undefined) {
        throw Error('Trying to delete nonexistent user');
    }
    delete users[userLogin]
}

function updateUser(userLogin, userInfo) {
    const targetUser = users[userLogin];
    Object.keys(userInfo).forEach(key => {
        targetUser[key] = userInfo[key]
    });
}

module.exports = { addUser, getUserByLogin, deleteUser, getAllUsers, updateUser };
