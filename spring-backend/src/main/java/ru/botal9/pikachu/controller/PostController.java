package ru.botal9.pikachu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.botal9.pikachu.exception.PostAlreadyExistsException;
import ru.botal9.pikachu.exception.PostNotFoundException;
import ru.botal9.pikachu.model.Post;
import ru.botal9.pikachu.repository.PostRepository;
import ru.botal9.pikachu.service.SequenceGeneratorService;

import java.util.List;

@RestController
@RequestMapping("${v1API}/posts")
public class PostController {
    private final PostRepository repository;
    private final SequenceGeneratorService sequenceGenerator;

    @Autowired
    PostController(PostRepository repository, SequenceGeneratorService sequenceGenerator) {
        this.repository = repository;
        this.sequenceGenerator = sequenceGenerator;
    }

    @GetMapping("/")
    List<Post> getAll() {
        return repository.findAll();
    }

    @PostMapping("/add")
    Post add(@RequestBody Post post) {
        if (post.getId() != null && repository.findById(post.getId()).isPresent())
            throw new PostAlreadyExistsException(post.getId());

        post.setId(sequenceGenerator.generateSequence(Post.SEQUENCE_NAME));
        return repository.save(post);
    }

    @GetMapping("/{id}")
    Post getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    @GetMapping("/by-user/{login}")
    List<Post> getAllByUserLogin(@PathVariable String login) {
        return repository.getAllByAuthor(login);
    }
}
