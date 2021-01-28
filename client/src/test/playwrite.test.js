/**
 * @jest-environment node
 */

const { chromium } = require('playwright');
const browserName = process.env.BROWSER || 'chromium';
const fetch = require("node-fetch");

describe('Playwrite tests', () => {
    let browser = null;
    let page = null;

    const host = 'http://localhost:3000'
    const server = 'http://localhost:5000'
    const user = {
        login: 'Vovan',
        password: 'vovan1234',
        email: 'vovan2006@mail.ru',
        name: 'Vladimir',
    }

    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
        browser = null;
    })

    beforeEach(async () => {
        await fetch(`${server}/api/v1/test/reset`, {method: "DELETE"});
        await fetch( `${server}/api/v1/users/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user),
        });

        page = await browser.newPage();
        await page.goto(host);

        await page.fill('.SignInForm input:nth-child(1)', user.login);
        await page.fill('.SignInForm input:nth-child(2)', user.password);
        await page.click('button:text("Sign in")');
    });

    afterEach(async () => {
        await page.screenshot({
            path: `src/test/playwrite-screenshots/[${browserName}] ${expect.getState().currentTestName}.png`
        });
        page = null;
    });

    it('check new post appearance in "My posts"', async () => {
        await page.click('a:text("My Posts")');

        const posts = await page.$('article.Post');
        expect(posts).toBe(null);

        await page.click('a:text("Add Post")');
        await page.fill('input.PostForm-title', 'First post');
        await page.fill('textarea.PostForm-text', 'This is my first post.');
        await page.click('.PostForm .submit-btn');

        await page.click('a:text("My Posts")');
        await page.waitForSelector('article.Post');
        const post = await page.$('article.Post')
        expect(post).not.toBe(null);
    })

    it('check if user have no posts', async () => {
        await page.click('a:text("My Posts")');
        await page.waitForSelector('text=No posts found');
    })

    it('check navigation to /Feed by clicking "Pikachu"', async () => {
        await page.click('a:text("Users")');
        await page.click('text=pikachu');

        const url = await page.url();
        expect(url).toMatch('Feed');
    })

    it('check navigation to /Feed by clicking pikachu image', async () => {
        await page.click('a:text("Users")');
        await page.click('img.Header-logo');

        const url = await page.url();
        expect(url).toMatch('Feed');
    })

    it('check navigation to /Posts by clicking "Posts" in side panel', async () => {
        await page.click('a:text("Users")');
        await page.click('a:text("Posts")');

        const url = await page.url();
        expect(url).toMatch('Posts');
    })
})


