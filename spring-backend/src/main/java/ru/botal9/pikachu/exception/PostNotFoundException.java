package ru.botal9.pikachu.exception;

public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(Long id) {
        super("Could not find post with id " + id);
    }
}
