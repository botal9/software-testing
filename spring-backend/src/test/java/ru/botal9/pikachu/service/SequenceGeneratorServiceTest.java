package ru.botal9.pikachu.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import ru.botal9.pikachu.model.User;
import ru.botal9.pikachu.repository.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Testcontainers
class SequenceGeneratorServiceTest {
    @Autowired
    private UserRepository userRepository;

//    @Container
//    final MongoDBContainer mongoDBContainer =
//            new MongoDBContainer("mongo:4.0.10").withExposedPorts(27017);

    @BeforeEach
    public void clearDB() {
        userRepository.deleteAll();
    }

    @Test
    public void testUsersHaveUniqueIds() {
//        assertTrue(mongoDBContainer.isRunning());

        User adam = new User("adam", "adam@heaven.biz", "Adam", "haha");
        User eva = new User("eva", "eva@heaven.biz", "Eva", "hehe");

        userRepository.save(adam);
        userRepository.save(eva);

        Optional<User> maybeAdam = userRepository.getUserByLogin("adam");
        Optional<User> maybeEva = userRepository.getUserByLogin("eva");
        assertTrue(maybeAdam.isPresent());
        assertTrue(maybeEva.isPresent());

        Long adamId = maybeAdam.get().getId();
        Long evaId = maybeEva.get().getId();
        assertTrue(adamId > 0L);
        assertTrue(evaId > 0L);
        assertNotEquals(adamId, evaId);
    }
}