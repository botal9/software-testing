package ru.botal9.pikachu.exception;

public class PostAlreadyExistsException extends RuntimeException {
    public PostAlreadyExistsException(Long id) {
        super("Post with id " + id + " already exists");
    }
}
