package ru.botal9.pikachu.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.botal9.pikachu.model.Post;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, Long> {
    List<Post> getAllByAuthor(String author);
}
