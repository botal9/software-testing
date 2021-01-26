let posts = {
    1: {
        title: 'Initial post',
        text: 'Hello, world!',
        author: 'admin',
        postId: 1,
    },
    2: {
        title: 'Post #2',
        text: 'Memes <3',
        author: 'admin',
        postId: 2,
    },
    3: {
        title: 'Bomber be like',
        text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        author: 'admin',
        postId: 3,
    }
};

let gPostId = 4;

function addPost(post) {
    if (post === undefined ||
        post.author === undefined ||
        post.postId !== undefined) {
        throw Error('Trying to add invalid post');
    }
    post.postId = gPostId++;
    posts[post.postId] = post;
}

function getPostById(id) {
    if (typeof id !== 'number') {
        throw Error('Invalid id');
    }
    return posts[id] || null;
}

function getAllPostsByUser(userLogin) {
    if (typeof userLogin !== 'string')
        return []

    return getAllPosts().filter(post => post.author === userLogin);
}

function getAllPosts() {
    const postList = []
    for (const postId in posts) {
        postList.push(posts[postId]);
    }
    return postList;
}

function resetPostsForTesting() {
    posts = {};
}

module.exports = { addPost, getPostById, getAllPosts, getAllPostsByUser, resetPostsForTesting };
