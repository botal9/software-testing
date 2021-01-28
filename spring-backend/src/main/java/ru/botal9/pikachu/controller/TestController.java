package ru.botal9.pikachu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.botal9.pikachu.repository.PostRepository;
import ru.botal9.pikachu.repository.UserRepository;

@RestController
@RequestMapping("${v1API}/test")
public class TestController {
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    TestController(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @DeleteMapping("/reset")
    void deleteAllPostsAndUsers() {
        this.userRepository.deleteAll();
        this.postRepository.deleteAll();
    }
}
