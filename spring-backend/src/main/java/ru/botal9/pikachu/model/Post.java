package ru.botal9.pikachu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "posts")
public class Post {
    @Transient
    public static final String SEQUENCE_NAME = "posts_sequence";

    @Id
    private Long id = 0L;

    public String title;
    public String text;
    public String author;

    Post() {}

    public Post(String title, String text, String author) {
        this.title = title;
        this.text = text;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}