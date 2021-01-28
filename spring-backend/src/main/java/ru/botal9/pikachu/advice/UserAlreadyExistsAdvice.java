package ru.botal9.pikachu.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.botal9.pikachu.exception.UserAlreadyExistsException;

public class UserAlreadyExistsAdvice {

    @ResponseBody
    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String userNotFoundHandler(UserAlreadyExistsException e) {
        return e.getMessage();
    }
}
