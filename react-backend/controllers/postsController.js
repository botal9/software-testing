const posts = {
    1: {
        title: 'Initial post',
        text: 'Hello, world!',
        author: 'admin',
        postId: 1,
    }
};

let gPostId = 2;

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

function getAllPosts() {
    const postList = []
    for (const postId in posts) {
        postList.push(posts[postId]);
    }
    return postList;
}

module.exports = { addPost, getPostById, getAllPosts };
