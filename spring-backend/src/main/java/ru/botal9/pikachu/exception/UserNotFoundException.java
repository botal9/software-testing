package ru.botal9.pikachu.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String login) {
        super("Could not find user by login " + login);
    }

    public UserNotFoundException(String login, String password) {
        super("Could not find user by login " + login + " and password " + password);
    }
}
