package ru.botal9.pikachu.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.botal9.pikachu.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Long> {
    Optional<User> getUserByLogin(String login);
    Optional<User> getUserByLoginAndPassword(String login, String password);
}
