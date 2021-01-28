package ru.botal9.pikachu.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.botal9.pikachu.exception.UserAlreadyExistsException;
import ru.botal9.pikachu.exception.UserNotFoundException;
import ru.botal9.pikachu.model.User;
import ru.botal9.pikachu.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserControllerTest {
    @Autowired private UserController userController;
    @Autowired private UserRepository userRepository;

    @BeforeEach
    public void clearDB() {
        userRepository.deleteAll();
    }

    @Test
    public void testAddSameUser() {
        User adam = new User("adam", "adam@heaven.biz", "Adam", "haha");

        User addedUser = userController.add(adam);
        assertEquals(adam.login, addedUser.login);
        assertEquals(adam.email, addedUser.email);
        assertEquals(adam.password, addedUser.password);
        assertEquals(adam.name, addedUser.name);
        assertTrue(addedUser.getId() > 0);

        assertThrows(UserAlreadyExistsException.class, () -> userController.add(adam));
    }

    @Test
    public void testTryGetNonExistingUser() {
        User adam = new User("adam", "adam@heaven.biz", "Adam", "haha");
        userController.add(adam);

        assertThrows(UserNotFoundException.class, () -> userController.getByLogin("eva"));
    }
}
