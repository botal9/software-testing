# Software testing course project
[Course page](https://volekerb.github.io/testing-lectures/)

## Build and Run
Client:
```
cd client
npm install
npm start
```
Server:
```
cd react-backend
node app
```
Tests:
```
cd client
npm test
```

## HW 1
Сделаны Main и Advanced части.
* React клиент и Node.js бэкенд
* Есть несколько страниц с роутингом 
* Есть авторизация 
* Есть тесты на проверку авторизации (пока все тесты так или иначе ее проверяют)
* [Unit тесты](/client/src/components/sidebar/components/validators.test.js)
* [Компонентные тесты](/client/src/components/header/Header.test.js)
* [E2E тесты (один)](/client/src/components/app/App.test.js)