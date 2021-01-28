package ru.botal9.pikachu.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.botal9.pikachu.exception.PostAlreadyExistsException;

public class PostAlreadyExistsAdvice {

    @ResponseBody
    @ExceptionHandler(PostAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String userNotFoundHandler(PostAlreadyExistsException e) {
        return e.getMessage();
    }
}
