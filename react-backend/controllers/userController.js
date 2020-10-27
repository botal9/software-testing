const users = {
    'admin': {
        id: 1,
        login: 'admin',
        password: 'admin',
        email: 'admin@admin.ru',
        name: 'Vasya Pupkin',
        salary: '300kk/ns'
    }
};

let gUserId = 2;

function addUser(user) {
    if (user === undefined ||
        user.login === undefined) {
        throw Error('Trying to add invalid user');
    }
    user.id = gUserId++;
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
