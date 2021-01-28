package ru.botal9.pikachu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.botal9.pikachu.exception.UserAlreadyExistsException;
import ru.botal9.pikachu.exception.UserNotFoundException;
import ru.botal9.pikachu.model.User;
import ru.botal9.pikachu.repository.UserRepository;
import ru.botal9.pikachu.service.SequenceGeneratorService;

import java.util.List;

@RestController
@RequestMapping("${v1API}/users")
public class UserController {
    private final UserRepository repository;
    private final SequenceGeneratorService sequenceGenerator;

        @Autowired
        UserController(UserRepository repository, SequenceGeneratorService sequenceGenerator) {
            this.repository = repository;
            this.sequenceGenerator = sequenceGenerator;

        }

    @GetMapping("/")
    List<User> all() {
        return repository.findAll();
    }

    @PostMapping("/add")
    User add(@RequestBody User user) {
        if (repository.getUserByLogin(user.login).isPresent())
            throw new UserAlreadyExistsException(user.login);

        user.setId(sequenceGenerator.generateSequence(User.SEQUENCE_NAME));
        return repository.save(user);
    }

    @GetMapping("/{login}")
    User getByLogin(@PathVariable String login) {
        return repository.getUserByLogin(login).orElseThrow(() -> new UserNotFoundException(login));
    }

    @GetMapping("/{login}/{password}")
    User getByLoginAndPassword(@PathVariable String login, @PathVariable String password) {
        return repository.getUserByLoginAndPassword(login, password)
                .orElseThrow(() -> new UserNotFoundException(login, password));
    }

    @DeleteMapping("/{login}")
    void deleteByLogin(@PathVariable String login) {
        User user = repository.getUserByLogin(login).orElseThrow(() -> new UserNotFoundException(login));
        repository.deleteById(user.getId());
    }
}
