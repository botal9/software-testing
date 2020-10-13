const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/', function(req, res) {
    const users = userController.getAllUsers();
    res.status(200).send(users);
});

router.post('/', function(req, res) {
  const body = req.body;
  const user = body.user;
  try {
      userController.addUser(user);
      res.status(201).send(user);
  } catch (e) {
      res.status(400).send(e.message());
  }
});

router.get('/:login', function(req, res) {
  const userLogin = req.params.login;
  try {
      const targetUser = userController.getUserByLogin(userLogin)
      res.status(200).send(targetUser);
  } catch (e) {
      res.sendStatus(404);
  }
});

router.get('/:login/:password', function(req, res) {
  const userLogin = req.params.login;
  const userPassword = req.params.password;
  try {
      const targetUser = userController.getUserByLogin(userLogin)
      if (targetUser.password !== userPassword)
          res.sendStatus(404);
      res.status(200).send(JSON.stringify(targetUser));
  } catch (e) {
      res.sendStatus(404);
  }
});

router.delete('/:login', function(req, res) {
  const userLogin = req.params.login;
  try {
      userController.deleteUser(userLogin);
      res.status(204);
  } catch (e) {
      res.sendStatus(404);
  }
});

module.exports = router;
