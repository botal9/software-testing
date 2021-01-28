package ru.botal9.pikachu.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.botal9.pikachu.model.Post;
import ru.botal9.pikachu.model.User;
import ru.botal9.pikachu.repository.PostRepository;
import ru.botal9.pikachu.repository.UserRepository;

@Configuration
public class LoadDatabase {
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository,
                                   PostRepository postRepository) {
        userRepository.deleteAll();
        postRepository.deleteAll();

        return args -> {
            User admin = new User("admin", "admin@admin.ru", "Vasya Pupkin", "admin");
            userRepository.save(admin);

            User vovan = new User("Vovan", "vovan2006@mail.ru", "Vladimir", "vovan1234");
            userRepository.save(vovan);

            Post post1 = new Post("Initial post", "Hello, world!", "admin");
            postRepository.save(post1);

            Post post2 = new Post("Post #2", "Memes <3", "admin");
            postRepository.save(post2);

            Post post3 = new Post(
                    "Bomber be like",
                    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "admin");
            postRepository.save(post3);
        };
    }
}
